"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { z } from "zod";
import InputField from "../../components/InputField";
import axios from 'axios';
import { endpoints } from '@/app/utils/apis';

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().optional(),
  email: z.string().optional(),
  linkedin: z.string().optional(),
  facebook: z.string().optional(),
  photo: z
    .any()
    .optional()
    .refine((file) => {
      // If no file is provided, it's valid since it's optional
      if (!file || file.length === 0) return true;
      // If a file is provided, ensure only one file is uploaded
      return file.length === 1;
    }, { message: "Only one photo can be uploaded." })
    .refine((file) => {
      // If no file is provided, skip the type check
      if (!file || file.length === 0) return true;
      // Validate the file type
      return ["image/jpeg", "image/png", "image/gif"].includes(file[0]?.type);
    }, { message: "Only JPEG, PNG, and GIF files are allowed." }),
  description: z.string().optional(),
});

type Inputs = z.infer<typeof schema>;

interface CreateMemberFormProps {
  onClose: () => void;
  onAddMember: (member: { id: string; name: string }) => void; // Ensure this is defined
}


const MemberForm: React.FC<CreateMemberFormProps> = ({ onClose, onAddMember }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (data) => {
      console.log('Form data:', data);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Authentication token not found.");
        return;

      }
      let avatarUrl = "";
      if(data.photo.length > 0) {
      // Upload Photo
      const photoFile = data.photo[0];
    
        const formData = new FormData();
        formData.append("file", photoFile);
        formData.append("type", "avatar");

        const uploadResponse = await axios.post(endpoints.uploadavatar, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

      avatarUrl = uploadResponse.data.file_url;
      console.log('Avatar URL:', avatarUrl);
      }
      

      // Submit Member Data
      const memberData: any = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        avatar: avatarUrl || null,
      };
      
      if (data.linkedin) memberData.linkedin_url = data.linkedin;
      if (data.facebook) memberData.facebook_url = data.facebook;
      console.log('Member data:', memberData);
      const memberResponse = await axios.post(endpoints.createmembers, memberData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // After successful creation
      onAddMember({ id: memberResponse.data.id, name: memberResponse.data.name });
      toast.success("Member created successfully!");
      if (data.description) {
        const noteData = {
          content: data.description,
          content_type: "member",
          object_id: memberResponse.data.id,
        };
      
        await axios.post(endpoints.createnotes, noteData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }
      
      reset();
      setPhotoPreview(null);
      onClose();
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("Error creating member:", error.response?.data);
        toast.error(error.response?.data?.message || "Failed to create member.");
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred.");
      }
    }
    });
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setPhotoPreview(null);
    }
  };


  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={onSubmit}>
    {/* Bên trái: Thông tin thành viên */}
    <div className="flex flex-col gap-6">
      <InputField
        label="Name"
        name="name"
        register={register}
        error={errors?.name}
      />
      <InputField
        label="Phone"
        name="phone"
        register={register}
        error={errors?.phone}
      />
      <InputField
        label="Email"
        name="email"
        register={register}
        error={errors?.email}
      />
      <InputField
        label="LinkedIn"
        name="linkedin"
        register={register}
        error={errors?.linkedin}
      />
      <InputField
        label="Facebook"
        name="facebook"
        register={register}
        error={errors?.facebook}
      />
      <InputField
        label="Description"
        name="description"
        register={register}
        error={errors?.description}
      />
      
    </div>
  
    {/* Bên phải: Upload Avatar */}
    <div className="flex flex-col items-center">
      <label className="block text-sm font-medium text-gray-700 mb-2">Avatar</label>
      {photoPreview ? (
        <img
          src={photoPreview}
          alt="Avatar Preview"
          className="w-48 h-48 object-cover rounded-full mb-4"
        />
      ) : (
        <div className="w-48 h-48 flex items-center justify-center bg-gray-200 rounded-full mb-4">
          <p className="text-gray-500">No Avatar</p>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        {...register("photo")}
        onChange={(e) => {
          register("photo").onChange(e);
          handlePhotoChange(e);
        }}
        className="mt-1"
      />
      {errors.photo && (
        <p className="text-xs text-red-500 mt-1">
          {errors.photo.message?.toString()}
        </p>
      )}
    </div>
  
    {/* Nút Submit */}
    <div className="md:col-span-2 flex justify-end">
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mt-4"
      >
        Save Member
      </button>
    </div>
  </form>
  );
};

export default MemberForm;
