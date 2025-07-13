// components/ExperienceCard.tsx
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ExperienceCardProps {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
  logo?: string;
  isLast?: boolean;
}

export const ExperienceCard = ({
  role,
  company,
  period,
  description,
  skills,
  logo,
  isLast = false
}: ExperienceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`flex relative ${!isLast ? 'pb-12' : ''}`}
    >
      {/* Timeline indicator */}
      {!isLast && (
        <div className="absolute left-9 top-14 w-0.5 h-full bg-dark/20 dark:bg-light/20 origin-top" />
      )}
      
      <div className="flex-shrink-0 w-18 h-18 rounded-full bg-light dark:bg-dark border-2 border-dark dark:border-light flex items-center justify-center z-10">
        {logo ? (
          <Image
            src={logo}
            alt={`${company} logo`}
            width={48}
            height={48}
            className="w-10 h-10 object-contain"
          />
        ) : (
          <span className="text-lg font-bold">{company.charAt(0)}</span>
        )}
      </div>

      <div className="ml-6">
        <h3 className="text-xl font-bold">
          {role} · {company}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{period}</p>
        
        <ul className="list-disc pl-5 mb-4">
          {description.map((item, index) => (
            <li key={index} className="mb-1">
              {item}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs bg-dark/10 dark:bg-light/10 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};