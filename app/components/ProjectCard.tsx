import {motion} from 'framer-motion'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ProjectCardProps {
              id: string;
              title: string;
              description: string;
              tags: string[];
              image: string;
              link: string;
              github: string;

}

const FramerImage = motion(Image);

export const ProjectCard = ({

title,
description,
tags,
image,
link,
github,

}: ProjectCardProps) => {
              return(
                 <motion.article
                 initial = {{ y:50, opacity: 0}} 
                 transition={{duration:0.5}}
                 viewport={{once: true}}
                 className='w-full flex flex-col items-center justify-center rounded-2xl border-solid border-dark bg-light dark:bg-dark dark-border-light p-6 relative shadow-2xl'
                 >
                  <div className='absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark dark:bg-light rounded-br-3xl' >

                  </div>

                  <Link href={link} target='_blank' className='w-full cursor-pointer overflow-hidden rounded-lg'>
                     <FramerImage 
                     src={image}
                     alt={title}
                     className='w-full h-auto rounded-lg'
                     whileHover={{ scale: 1.05 }}
                     transition={{duration: 0.2}}
                     priority
                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"

                     />
                  </Link>

                  <div className='w-full flex flex-col items-start justify-between mt-4'>
                     <span className='text-primary font-semibold text-lg dark:text-primaryDark'>
                        {title}

                     </span>
                     <p className='my-2 font-medium text-dark dark:text-light'>{description}</p>

                     <div className='w-full flex items-center justify-between mt-2'>
                        <Link href={link} target='_blank' className='text-primary dark:text-primaryDark underline font-semibold hover:text-dark dark:hover:text-light'>
                        Visit
                        </Link>
                        <Link
            href={github}
            target="_blank"
            className="text-lg font-semibold underline"
          >
            GitHub
          </Link>
                     </div>
                     <div className="flex flex-wrap mt-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 mr-2 mb-2 text-sm bg-dark text-light dark:bg-light dark:text-dark rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
                  </div>
                 </motion.article>          
              )

}