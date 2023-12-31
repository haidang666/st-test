'use client'

import AppTable from "@/components/table";
import AppUpload from "@/components/upload";

import { useState } from "react";

export default function Home() {
  const [uploadComplete, setUploadComplete] = useState(false);
  const onUploadComplete = () => {
    setUploadComplete(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-5 p-24">
      { !uploadComplete && 
        <div>
          <AppUpload onUploadComplete={onUploadComplete}/>
        </div> 
      }

      <div className="w-full">
        {uploadComplete && <AppTable />}
        {!uploadComplete && <div className="text-center w-full">Upload a CSV file to get started</div>}
      </div>
    </main>
  )
}
