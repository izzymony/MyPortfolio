/* 'use client'
import {IconType} from 'react-icons';

// Example: import all FontAwesome icons
import * as Icons from 'react-icons/fa';

interface SkillPillProps {
     name: string;
     icon: string;
     level: number;         
}

export const SkillPill = ({name, icon, level}: SkillPillProps) => {
              const IconComponent = Icons[icon as keyof typeof Icons] as IconType;

              return(
                   <div>
                                <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                                     <IconComponent className="text-xl text-blue-500" />
                                     <span className="font-semibold">{name}</span>
                                </div>
                                <div className="mt-1">
                                     <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                              <div
                                                   className="bg-blue-500 h-2.5 rounded-full"
                                                   style={{ width: `${level * 10}%` }}
                                              ></div>
                                     </div>
                                </div>
                   </div>         
              )
} */