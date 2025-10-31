'use client'
import React, { useState } from "react"
import { supabase } from "@/lib/supabaseClient"


export default function(){
              const [title, setTitle] = useState("")
              const [description, setDescription] = useState("")
              const [image, setImage] = useState<File | null>(null)
              const[techStack,setTechStack] = useState("")
              const[liveUrl,setLiveUrl]= useState("")
               const [githubUrl, setGithubUrl] = useState("");
              const [isLoading, setIsLoading]=useState(false)
              

              const handleUpload = async () =>{
                if (!title || !image) return alert("Title and image are required");
    setIsLoading(true);
     const filePath = `projects/${Date.now()}-${image.name}`;
     const {data: imageData, error:imageError} = await supabase.storage.from("project_image").upload(filePath,image);

     if(imageError){
        console.error(imageError) 
        alert("Image upload failed")  
        setIsLoading(false);   
     }

     const {data: publicUrl} =  supabase.storage.from("project_image").getPublicUrl(filePath);

try{
  const {error:dbError} = await supabase.from("projects").insert([
              {
                title,
                description,
                image_url:publicUrl.publicUrl,
                tech_stack:techStack.split(",").map((t) => t.trim()),
                github_url:githubUrl,
                live_url:liveUrl,
              },
  ])    
  
  if(dbError){
    alert("Error uploading items.")
  }else{
    alert("Uploaded Successfully")
     setTitle("");
      setDescription("");
      setTechStack("");
      setLiveUrl("");
      setGithubUrl("");
      setImage(null);
  }
  setIsLoading(false)
} catch(err){
  console.error("Error uploading to the database:", err)
} finally{
  setIsLoading(false)
}
              }
  return(
         <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
             <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="text-2xl font-bold text-white">
                <span className="text-purple-400">{'<'}</span>
                Ojehonmon Israel
                <span className="text-purple-400">{'/>'}</span>
              </div>
              
              {/* Desktop Navigation */}
             

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-white"
                
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          
        </nav>
        <div className="pt-24 px-4 py-4">

         <div  className=" flex flex-col gap-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Upload a Project</h1>     
          

      <input
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
           required
      />  

      <textarea
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
         className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
          required
      />

      <input
        placeholder="Tech Stack (comma separated, e.g. React, Tailwind, Supabase)"
        value={techStack}
        onChange={(e) => setTechStack(e.target.value)}
        
         className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
         required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
         className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
         required
      />

      <input type="text"
      placeholder="Github link"
        value={githubUrl}
      onChange={(e)=> setGithubUrl(e.target.value) }
       className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
       />
      <input type="text"
      placeholder="Live url link"
        value={liveUrl}
      onChange={(e)=> setLiveUrl(e.target.value) }
       className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
       />

      <button onClick={handleUpload} disabled={isLoading} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
        {isLoading ? "Uploading..." : "Upload Project"}

      </button>
         </div>          
        </div>
         </div>        
  )            
}