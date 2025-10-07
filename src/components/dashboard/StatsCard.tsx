/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Card from "../ui/Card";
import { ArrowUp, ArrowDown } from "@carbon/icons-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ComponentType<any>;
  color?: "primary" | "success" | "warning" | "danger";
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  color = "primary",
}) => {
  const colors = {
    primary: "text-purpleAccent bg-purple-50",
    success: "text-success bg-green-50",
    warning: "text-warning bg-yellow-50",
    danger: "text-error bg-red-50",
  };

  const isPositiveChange = change && change > 0;

  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
          <p className="text-3xl font-bold text-charcoal">{value}</p>

          {change !== undefined && (
            <div className="flex items-center mt-2 space-x-1">
              {isPositiveChange ? (
                <ArrowUp size={16} className="text-success" />
              ) : (
                <ArrowDown size={16} className="text-error" />
              )}
              <span
                className={`text-sm font-medium ${
                  isPositiveChange ? "text-success" : "text-error"
                }`}
              >
                {Math.abs(change)}%
              </span>
              {changeLabel && (
                <span className="text-sm text-gray-500">{changeLabel}</span>
              )}
            </div>
          )}
        </div>

        {Icon && (
          <div className={`p-3 rounded-lg ${colors[color]}`}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatsCard;
