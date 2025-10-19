import React, { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import StatsCard from "../../components/dashboard/StatsCard";
import CertificationCard from "../../components/dashboard/CertificationCard";
import { Certificate, Time, Trophy, ArrowUp } from "@carbon/icons-react";

const Dashboard: React.FC = () => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const stats = [
    {
      title: "Total Certifications",
      value: "12",
      change: 15,
      changeLabel: "vs last month",
      icon: Certificate,
      color: "primary" as const,
    },
    {
      title: "Study Hours This Week",
      value: "24.5",
      change: 8,
      changeLabel: "vs last week",
      icon: Time,
      color: "success" as const,
    },
    {
      title: "Average Score",
      value: "87%",
      change: 12,
      changeLabel: "improvement",
      icon: ArrowUp,
      color: "primary" as const,
    },
    {
      title: "Achievements",
      value: "8",
      change: 25,
      changeLabel: "this month",
      icon: Trophy,
      color: "warning" as const,
    },
  ];

  const certifications = [
    {
      title: "AWS Solutions Architect",
      provider: "Amazon Web Services",
      progress: 87,
      examDate: "March 15, 2024",
      status: "in-progress" as const,
    },
    {
      title: "CompTIA Security+",
      provider: "CompTIA",
      progress: 100,
      status: "completed" as const,
    },
    {
      title: "Azure Fundamentals",
      provider: "Microsoft",
      progress: 45,
      examDate: "April 2, 2024",
      status: "scheduled" as const,
    },
  ];

  return (
    <div className="flex h-screen bg-offWhite">
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-charcoal mb-2">
              Welcome back, John! 👋
            </h1>
            <p className="text-gray-600">
              Here's your certification progress overview for this week.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Study Progress */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-charcoal">
                  Active Certifications
                </h2>
                <button className="text-purpleAccent hover:text-violet text-sm font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-6">
                {certifications.map((cert, index) => (
                  <CertificationCard key={index} {...cert} />
                ))}
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* Today's Schedule */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-charcoal mb-4">
                  Today's Schedule
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purpleAccent rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-charcoal">
                        AWS Practice Test
                      </p>
                      <p className="text-xs text-gray-500">2:00 PM - 3:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-mutedBlue rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-charcoal">
                        Security+ Review
                      </p>
                      <p className="text-xs text-gray-500">4:00 PM - 5:30 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-violet to-purpleAccent rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">
                  This Week's Progress
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Study Time</span>
                    <span className="font-semibold">24.5 hrs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Practice Tests</span>
                    <span className="font-semibold">8 completed</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Avg Score</span>
                    <span className="font-semibold">87%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
