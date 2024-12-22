"use client"

import React, { useState, useEffect } from 'react'
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell, LineChart, Line } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PhaseCount {
  count: number;
}

interface BatchPhases {
  'Peer Mentor': PhaseCount;
  'Incubation': PhaseCount;
  'EIR Support': PhaseCount;
  Total: PhaseCount;
}

interface PhasesCount {
  'AY 22-23': BatchPhases;
  'AY 23-24': BatchPhases;
  'AY 24-25': BatchPhases;
  Total: BatchPhases;
}

interface BatchCategory {
  active: number;
  inactive: number;
}

interface BatchData {
  Technology: BatchCategory;
  Travel: BatchCategory;
  Healthcare: BatchCategory;
  Finance: BatchCategory;
  Education: BatchCategory;
  'Social Media': BatchCategory;
  Others: BatchCategory;
  Total: BatchCategory;
}

interface BatchesCount {
  'AY 22-23': BatchData;
  'AY 23-24': BatchData;
  'AY 24-25': BatchData;
  Total: BatchData;
}

const dummyData = {
  batches_count: {
    'AY 22-23': {
      Technology: { active: 15, inactive: 5 },
      Travel: { active: 8, inactive: 2 },
      Healthcare: { active: 12, inactive: 3 },
      Finance: { active: 6, inactive: 2 },
      Education: { active: 10, inactive: 2 },
      'Social Media': { active: 5, inactive: 2 },
      Others: { active: 3, inactive: 2 },
      Total: { active: 59, inactive: 16 }
    },
    'AY 23-24': {
      Technology: { active: 20, inactive: 5 },
      Travel: { active: 12, inactive: 3 },
      Healthcare: { active: 15, inactive: 3 },
      Finance: { active: 8, inactive: 2 },
      Education: { active: 13, inactive: 3 },
      'Social Media': { active: 7, inactive: 2 },
      Others: { active: 5, inactive: 2 },
      Total: { active: 70, inactive: 17 }
    },
    'AY 24-25': {
      Technology: { active: 25, inactive: 5 },
      Travel: { active: 16, inactive: 4 },
      Healthcare: { active: 18, inactive: 4 },
      Finance: { active: 10, inactive: 2 },
      Education: { active: 17, inactive: 3 },
      'Social Media': { active: 9, inactive: 2 },
      Others: { active: 6, inactive: 2 },
      Total: { active: 80, inactive: 18 }
    },
    Total: {
      Technology: { active: 60, inactive: 15 },
      Travel: { active: 36, inactive: 9 },
      Healthcare: { active: 45, inactive: 9 },
      Finance: { active: 24, inactive: 6 },
      Education: { active: 40, inactive: 7 },
      'Social Media': { active: 21, inactive: 6 },
      Others: { active: 14, inactive: 6 },
      Total: { active: 240, inactive: 53 }
    }
  },
  priority_count: {
    P0: { 
      Technology: { count: 50},
      Travel: { count: 30},
      Healthcare: { count: 40},
      Finance: { count: 25},
      Education: { count: 35},
      'Social Media': { count: 20},
      Others: { count: 15},
    },
    P1: { 
      Technology: { count: 100},
      Travel: { count: 60},
      Healthcare: { count: 80},
      Finance: { count: 50},
      Education: { count: 70},
      'Social Media': { count: 40},
      Others: { count: 30},
    },
    P2: { 
      Technology: { count: 50},
      Travel: { count: 30},
      Healthcare: { count: 40},
      Finance: { count: 25},
      Education: { count: 35},
      'Social Media': { count: 20},
      Others: { count: 15},
    },
    Total: {
      Technology: { count: 50},
      Travel: { count: 30},
      Healthcare: { count: 40},
      Finance: { count: 25},
      Education: { count: 35},
      'Social Media': { count: 20},
      Others: { count: 15},
    },
  },
  phases_count: {
    'AY 22-23': {
      'Peer Mentor': { count: 20 },
      Incubation: { count: 30 },
      'EIR Support': { count: 10 },
      Total: { count: 60 }
    },
    'AY 23-24': {
      'Peer Mentor': { count: 25 },
      Incubation: { count: 35 },
      'EIR Support': { count: 15 },
      Total: { count: 75 }
    },
    'AY 24-25': {
      'Peer Mentor': { count: 30 },
      Incubation: { count: 40 },
      'EIR Support': { count: 20 },
      Total: { count: 90 }
    },
    Total: {
      'Peer Mentor': { count: 75 },
      Incubation: { count: 105 },
      'EIR Support': { count: 45 },
      Total: { count: 225 }
    }
  } as PhasesCount,
  // Line chart with category filter
  phases_progress: {
    'Peer Mentor': {
      Technology: ['Startup_3', 'Startup_7', 'Startup_12', 'Startup_15'],
      Travel: ['Startup_2', 'Startup_8', 'Startup_11'],
      Healthcare: ['Startup_1', 'Startup_4', 'Startup_9', 'Startup_13', 'Startup_16', 'Startup_18'],
      Finance: ['Startup_5', 'Startup_10', 'Startup_14'],
      Education: ['Startup_6', 'Startup_17', 'Startup_19', 'Startup_20'],
      'Social Media': ['Startup_21', 'Startup_22'],
      Others: ['Startup_23', 'Startup_24', 'Startup_25'],
    },
    Incubation: {
      Technology: ['Startup_26', 'Startup_27', 'Startup_28', 'Startup_29', 'Startup_30', 'Startup_31'],
      Travel: ['Startup_32', 'Startup_33', 'Startup_34'],
      Healthcare: ['Startup_35', 'Startup_36', 'Startup_37', 'Startup_38'],
      Finance: ['Startup_39', 'Startup_40', 'Startup_41', 'Startup_42', 'Startup_43'],
      Education: ['Startup_44', 'Startup_45', 'Startup_46'],
      'Social Media': ['Startup_47', 'Startup_48', 'Startup_49', 'Startup_50'],
      Others: ['Startup_51', 'Startup_52'],
    },
    'EIR Support': {
      Technology: ['Startup_53', 'Startup_54', 'Startup_55'],
      Travel: ['Startup_56', 'Startup_57', 'Startup_58', 'Startup_59'],
      Healthcare: ['Startup_60', 'Startup_61'],
      'Finance': ['Startup_62', 'Startup_63', 'Startup_64', 'Startup_65', 'Startup_66'],
      'Education': ['Startup_67', 'Startup_68'],
      'Social Media': ['Startup_69', 'Startup_70', 'Startup_71'],
      Others: ['Startup_72', 'Startup_73', 'Startup_74'],
    },
  },
}

const COLORS = [
  '#FF4041', '#123499', '#008000', '#FAAB33', '#0088FE', "#e88449", '#FFBB28', '#FF8042',
  "#d0ed57", "#83a6ed", "#8dd1e1", "#ff8042", "#e88449",
  "#9c27b0", "#2196f3", "#4caf50", "#ff9800", "#f44336"
];

const CustomPieChartTooltip = ({ active, payload, label }: { active?: boolean, payload?: Array<any>, label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow">
        <p className="font-bold">{label}</p>
        {payload.map((entry, index) => (
          <p key={index}>
            <span style={{ color: entry.color }} className="font-bold">{entry.name}</span>: {entry.value} startups
            {entry.payload.active && <span className="text-green-600"> ({entry.payload.active} active</span>}
            {entry.payload.inactive && <span className="text-gray-600">, {entry.payload.inactive} inactive)</span>}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const CustomBarChartTooltip = ({ active, payload, label }: { active?: boolean, payload?: Array<any>, label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow">
        <p className="font-bold">{label}</p>
        {payload.map((entry, index) => (
          <p key={index}>
            <span style={{ color: entry.color }}>{entry.name}</span>: {entry.value} startups
          </p>
        ))}
      </div>
    )
  }
  return null
}

const CategoriesPieChart = ({ startupData }: { startupData: any }) => {
  const [selectedBatch, setSelectedBatch] = useState<keyof BatchesCount>('Total');
  const batches = Object.keys(startupData.batches_count) as Array<keyof BatchesCount>;

  // console.log("selectedBatch", selectedBatch);
  // console.log("batches keys", batches);
  // console.log("batches data", startupData.batches_count);
  // console.log("batches_count.Total", startupData.batches_count['Total']);
  // console.log("startupData", startupData.batches_count[selectedBatch]);

  const data = Object.entries(startupData.batches_count[selectedBatch])
    .filter(([key]) => key !== 'Total')
    .map(([key, value]) => ({
      name: key,
      value: (value as any).active + (value as any).inactive,
      active: (value as any).active,
      inactive: (value as any).inactive
    }));

  return (
    <Card className="w-full space-y-2">
      <CardHeader>
        <CardTitle className="text-2xl">Startup Categories</CardTitle>
        <CardDescription className="text-md">Distribution of startups across different categories</CardDescription>
        <Select 
          onValueChange={(value: string) => setSelectedBatch(value as keyof BatchesCount)} 
          defaultValue={selectedBatch}
        >
          <SelectTrigger className="w-1/3">
            <SelectValue placeholder="Select batch" />
          </SelectTrigger>
          <SelectContent>
            {batches.map((batch) => (
              <SelectItem key={batch} value={batch}>{batch}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 20, bottom: 20 }}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomPieChartTooltip />} />
              <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

const PhasesPieChart = ({ startupData }: { startupData: any }) => {
  const [selectedBatch, setSelectedBatch] = useState<keyof PhasesCount>('Total');
  const batches = Object.keys(startupData.phases_count) as Array<keyof PhasesCount>;

  console.log("selectedBatch", selectedBatch);
  console.log("phases_count keys", batches);
  console.log("phases_count data", startupData.phases_count);
  console.log("phases_count.Total", startupData.phases_count['Total']);
  console.log("startupData", startupData.phases_count[selectedBatch]);

  const data = Object.entries(startupData.phases_count[selectedBatch])
    .filter(([key]) => key !== 'Total')
    .map(([key, value]) => ({ name: key, value: (value as any).count }));

  return (
    <Card className="w-full space-y-2">
      <CardHeader>
        <CardTitle className="text-2xl">Startup Phases</CardTitle>
        <CardDescription className="text-md">Distribution of startups across different phases</CardDescription>
        <Select 
          onValueChange={(value: string) => setSelectedBatch(value as keyof PhasesCount)} 
          defaultValue={selectedBatch}
        >
          <SelectTrigger className="w-1/3">
            <SelectValue placeholder="Select batch" />
          </SelectTrigger>
          <SelectContent>
            {batches.map((batch) => (
              <SelectItem key={batch} value={batch}>{batch}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 20, bottom: 20 }}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomPieChartTooltip />} />
              <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

const BatchesBarChart = ({ startupData }: { startupData: any }) => {
  const [selectedCategory, setSelectedCategory] = useState<keyof BatchData>('Total');
  const categories = Object.keys(startupData.batches_count['AY 22-23'])

  console.log("selectedCategory", selectedCategory);
  console.log("categories", categories);
  console.log("startupData", startupData.batches_count);
  console.log("startupData.batches_count['AY 22-23']", startupData.batches_count['AY 22-23']);

  const data = Object.entries(startupData.batches_count)
    .filter(([key]) => key !== 'Total')
    .map(([key, value]) => ({
      name: key,
      Active: (value as any)[selectedCategory].active,
      Inactive: (value as any)[selectedCategory].inactive
    }))

  return (
    <Card className="w-5/12 space-y-2">
      <CardHeader>
        <CardTitle className="text-2xl">Startups Across Batches</CardTitle>
        <CardDescription className="text-md">Number of startups in each batch</CardDescription>
        <Select 
          onValueChange={(value: string) => setSelectedCategory(value as keyof BatchData)} 
          defaultValue={selectedCategory}
        >
          <SelectTrigger className="w-1/3">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={60 }>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomBarChartTooltip />} />
              <Legend />
              <Bar dataKey="Active" fill="#008000" stackId="a" />
              <Bar dataKey="Inactive" fill="#8a8f93" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

const PriorityBarChart = ({ startupData }: { startupData: any }) => {
  // Transform data to show categories within each priority
  const data = Object.entries(startupData.priority_count)
    .filter(([key]) => key !== 'Total')
    .map(([priority]) => {
      const priorityData = startupData.priority_count[priority];
      return {
        name: priority,
        Technology: priorityData.Technology.count,
        Travel: priorityData.Travel.count,
        Healthcare: priorityData.Healthcare.count,
        Finance: priorityData.Finance.count,
        Education: priorityData.Education.count,
        'Social Media': priorityData['Social Media'].count,
        Others: priorityData.Others.count,
      };
    });

  const categories = ['Technology', 'Travel', 'Healthcare', 'Finance', 'Education', 'Social Media', 'Others'];

  return (
    <Card className="w-2/3 space-y-2">
      <CardHeader>
        <CardTitle className="text-2xl">Startups by Priority</CardTitle>
        <CardDescription className="text-md">Distribution of categories within each priority level</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[550px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomBarChartTooltip />} />
              <Legend />
              {categories.map((category, index) => (
                <Bar 
                  key={category}
                  dataKey={category}
                  stackId="a"
                  fill={COLORS[index % COLORS.length]}
                >
                  {data.map((entry, cellIndex) => (
                    <Cell 
                      key={`cell-${cellIndex}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

type Phase = 'Peer Mentor' | 'Incubation' | 'EIR Support';
type Category = keyof typeof dummyData.phases_progress['Peer Mentor'];

const StartupProgressChart = ({ startupData }: { startupData: any }) => {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof startupData.phases_progress['Peer Mentor']>('Technology');
  const categories = Object.keys(startupData.phases_progress['Peer Mentor']);
  
  // Transform data to show count of startups in each phase
  const transformData = () => {
    const phases: Phase[] = ['Peer Mentor', 'Incubation', 'EIR Support'];
    return phases.map(phase => ({
      phase,
      ...Object.keys(startupData.phases_progress[phase as Phase]).reduce((acc, category) => ({
        ...acc,
        [category]: startupData.phases_progress[phase as Phase][category as Category].length
      }), {})
    }));
  };

  return (
    <Card className="w-full space-y-2">
      <CardHeader>
        <CardTitle className="text-2xl">Startup Progress Distribution</CardTitle>
        <CardDescription className="text-md">Number of startups in each phase by category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={transformData()}>
              <XAxis dataKey="phase" />
              <YAxis />
              <Tooltip content={<CustomBarChartTooltip />} />
              <Legend />
              {categories.map((category, index) => (
                <Bar 
                  key={category}
                  dataKey={category}
                  stackId="a"
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const TotalStartupsCard = ({ startupData }: { startupData: any }) => {
  const totalActive = startupData.batches_count.Total.Total.active;
  const totalInactive = startupData.batches_count.Total.Total.inactive;
  const total = totalActive + totalInactive;

  return (
    <Card className="w-full h-full flex flex-col">
      <CardContent className="flex flex-col items-center justify-center h-full space-y-2">
        <div className="flex items-center">
          <div className="text-6xl font-bold">{total}</div>
          <div className="text-md ml-2 py-2 self-end">startups</div>
        </div>
        <div className="text-base text-gray-500 mt-24">
          <span className="text-green-600 text-lg">{totalActive} Active</span> • <span className="text-gray-600 text-lg">{totalInactive} Inactive</span>
        </div>
      </CardContent>
    </Card>
  );
};

const BatchGrowthCard = ({ startupData }: { startupData: any }) => {
  const latestBatch = startupData.batches_count['AY 24-25'].Total;
  const previousBatch = startupData.batches_count['AY 23-24'].Total;
  const currentTotal = latestBatch.active + latestBatch.inactive;
  const growth = currentTotal - (previousBatch.active + previousBatch.inactive);
  const growthPercentage = Math.round((growth / (previousBatch.active + previousBatch.inactive)) * 100);

  return (
    <Card className="w-full h-full flex flex-col">
      <CardContent className="flex flex-col items-center justify-center h-full space-y-2">
        <div className="flex items-center">
          <div className="text-6xl font-bold">{currentTotal}</div>
          <div className="text-md ml-2 py-2 self-end">startups in<br />current batch</div>
        </div>
        <div className="text-base text-gray-500">
          <span className="text-green-600 text-lg">{latestBatch.active} Active</span> • 
          <span className="text-gray-600 text-lg"> {latestBatch.inactive} Inactive</span>
        </div>
        <div className={`text-lg ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {growth >= 0 ? '↑' : '↓'} {Math.abs(growth)} ({growthPercentage}%)
          <div className="text-sm text-gray-500">from previous batch</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function StartupCharts() {
  const [data, setData] = useState<any>(dummyData);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('https://startupilot.cloud.strixthekiet.me/api/startups/analytics');
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const jsonData = await response.json();
  //       console.log(jsonData);
  //       setData(jsonData);
  //     } catch (err) {
  //       console.error('Failed to fetch data, using dummy data instead:', err);
  //       // Keep using dummy data if fetch fails
  //       setData(dummyData);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  // console.log("data", data);


  return (
    <div className="space-y-8">
      <div className="w-full flex space-x-4">
        <div className="w-7/12 flex flex-col space-y-4">
          <TotalStartupsCard startupData={data} />
          <BatchGrowthCard startupData={data} />
        </div>
        <CategoriesPieChart startupData={data} />
        <PhasesPieChart startupData={data} />
      </div>
      <div className="flex space-x-4">
        <BatchesBarChart startupData={data} />
        <PriorityBarChart startupData={data} />
      </div>
      <StartupProgressChart startupData={data} />
    </div>
  )
}

