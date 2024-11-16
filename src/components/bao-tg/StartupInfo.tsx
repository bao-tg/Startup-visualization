'use client'
import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { Card } from './StartupCard';

export const StartupInfo: React.FC = () => {
    return (
        <div className="w-full h-full bg-white space-y">
            <div className='flex'>
                <div>
                    <div className='flex flex-col gap-y-2' >
                        <div className="w-[70rem] bg-white rounded-2xl p-6 flex gap-x-8 mb-1">
                            <img src="https://static.ybox.vn/2023/5/3/1683723223801-336640751_761918645261000_7516888285445287067_n.jpg"
                                className="w-[7rem] rounded-full left-1"
                                alt="" />
                            <h1 className="text-5xl font-bold flex-1 self-center">Finful</h1>
                        </div>
                    </div>
                    <div className="ml-4 flex items-center mb-4">
                        <span className="bg-yellow-500 text-white text-sm mr-2 px-2.5 py-0.5 rounded">AY 2022-2023</span>
                        <span className="bg-orange-500 text-white text-sm mr-2 px-2.5 py-0.5 rounded">Incubator</span>
                        <span className="bg-red-600 text-white text-sm mr-2 px-2.5 py-0.5 rounded">P1</span>
                        <span className="bg-green-500 text-white text-sm mr-2 px-2.5 py-0.5 rounded">Active</span>
                    </div>
                </div>

                <div className="mt-4 flex flex-col items-center gap-6 ml-auto mr-10">
                    <FaLinkedin size={44} className="text-blue-600 cursor-pointer" />
                    <FaFacebook size={44} className="text-blue-800 cursor-pointer" />
                    <FaInstagram size={44} className="text-pink-600 cursor-pointer" />
                </div>
            </div>

            <div className="w-full flex justify-center my-4">
                <div style={{width: '80rem', height: '2px', backgroundColor: '#DBDBDB'}}></div>
            </div>

            <div className='flex items-center'>
                <h1 className = 'text-xl ml-4 font text-purple-600'>ACTIVE FOUNDER</h1>
                <div className="flex items-center ml-4 relative"></div>
                    <img className="w-[42.76px] h-[42.76px] rounded-full border border-white" src="https://via.placeholder.com/43x38" />
                    <img className="w-[42.76px] h-[42.76px] rounded-full border border-white -ml-2" src="https://via.placeholder.com/43x38" />
                    <img className="w-[42.76px] h-[42.76px] rounded-full border border-white -ml-2" src="https://via.placeholder.com/43x38" />
                    <div className="w-[42.76px] h-[42.76px] rounded-full border bg-gray-300 -ml-2 flex justify-center items-center text-gray-600 font-semibold">
                        +2
                    </div>
            </div>

            <div className="w-full flex justify-center my-4">
                <div style={{width: '80rem', height: '2px', backgroundColor: '#DBDBDB'}}></div>
            </div>

            <div className="flex flex-col ml-4">
                <div>
                    <h2 className="text-5xl font-semibold mt-7 mb-7">Project Description</h2>
                    <p className="text-gray-700 text-2xl ">
                    Finful is a financial education platform that uses gamification and a learn-to-earn model to engage Gen Z in building financial knowledge. By completing tasks and earning rewards, users are motivated to learn more about finance. Banks benefit by gaining access to financially literate customers, creating a win-win scenario where Gen Z acquires key financial skills, and banks attract responsible, well-informed clients.
                    </p>
                </div>

                <div>
                    <h2 className="text-5xl font-bold mt-7 mb-7">Latest News</h2>
                    <ul className="space-y-4">
                        <li>
                            <a href="https://vinuni.edu.vn/vinuni-and-techcombank-jointly-cultivate-a-future-generation-of-financially-savvy-leaders-through-strategic-cooperation/" 
                               className="text-blue-400 underline text-2xl font-semibold">
                                VinUni and Techcombank jointly cultivate a future generation of financially savvy leaders through strategic cooperation
                            </a>
                            <p className="text-xl mt-2">May 2024</p>
                        </li>
                        <li>
                            <a href="https://vinuni.edu.vn/vinuni-students-win-prizes-in-domestic-and-foreign-startup-competitions-with-the-desire-to-improve-understanding-of-personal-finance-for-young-vietnamese-people/" 
                               className="text-blue-400 underline text-2xl font-semibold">
                                VinUni students win prizes in domestic and foreign startup competitions with an edtech solution
                            </a>
                            <p className="text-xl mt-2">Oct 2023</p>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-5xl font-bold mt-7 mb-8">Funding Rounds</h2>
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-bold text-blue-600">Seed Round</h3>
                                    <p className="text-gray-600 text-lg mt-1">December 2023</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-3xl font-bold text-green-600">$500K</span>
                                    <p className="text-sm text-gray-500">Investment</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-bold text-blue-600">Pre-seed Round</h3>
                                    <p className="text-gray-600 text-lg mt-1">June 2023</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-3xl font-bold text-green-600">$100K</span>
                                    <p className="text-sm text-gray-500">Investment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}