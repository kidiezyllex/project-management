import {
  Clock,
  Filter,
  Grid3x3,
  List,
  PlusSquare,
  Share2,
  Table,
} from "lucide-react";
import React, { useState } from "react";
import ModalNewProject from "./ModalNewProject";
import Header from "../Header";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Props = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);

  return (
    <div className="px-4 xl:px-6">
      {/* <ModalNewProject
        isOpen={isModalNewProjectOpen}
        onClose={() => setIsModalNewProjectOpen(false)}
      /> */}
      <div className="py-4 lg:pb-4 lg:pt-8">
        <Header
          name="Product Design Development"
          buttonComponent={
            <Button
              variant="default"
              className="space-x-2 text-white"
              onClick={() => setIsModalNewProjectOpen(true)}
            >
              <PlusSquare className="h-5 w-5" /> New Boards
            </Button>
          }
        />
      </div>

      {/* TABS */}
      <div className="dark:border-stroke-dark flex flex-wrap-reverse gap-2 border border-x-0 border-y pb-[8px] pt-2 md:items-center">
        <div className="z-1 flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="Board"
            icon={<Grid3x3 className="h-4 w-4" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="List"
            icon={<List className="h-4 w-4" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Timeline"
            icon={<Clock className="h-4 w-4" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Table"
            icon={<Table className="h-4 w-4" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>
        <div className="flex w-full items-center gap-3 sm:w-fit">
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Filter className="h-4 w-4" />
          </button>
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Share2 className="h-4 w-4" />
          </button>
          <div className="relative flex w-[100%] items-center">
            <Input
              type="text"
              placeholder="Search task..."
              className="dark:border-dark-secondary dark:bg-dark-secondary rounded-md border py-1 pl-10 pr-4 focus:outline-none dark:text-white"
            />
            <Grid3x3 className="absolute left-3 h-4 w-4 text-gray-400 dark:text-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (tabName: string) => void;
  activeTab: string;
};

const TabButton = ({ name, icon, setActiveTab, activeTab }: TabButtonProps) => {
  const isActive = activeTab === name;

  return (
    <button
      className={`relative z-10 flex items-center gap-2 px-1 py-2 text-base after:absolute after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full hover:text-blue-600 dark:text-neutral-500 dark:hover:text-white sm:px-2 lg:px-4 ${
        isActive
          ? "text-blue-600 after:bg-blue-600 dark:text-white"
          : "text-gray-500"
      }`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  );
};

export default ProjectHeader;
