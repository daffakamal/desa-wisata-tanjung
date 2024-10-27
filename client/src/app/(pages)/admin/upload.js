'use client'

import React from 'react'
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { PlusIcon, UploadIcon, X } from "lucide-react"
import axios from "axios"

const DialogUpload = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)
    const fileInputRef = useRef(null)


    const handleSubmit = async (event) => {
        event.preventDefault()
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
          formData.append('image', image); 
        }
      
        try {
          const response = await axios.post('http://localhost:3001/in/tanaman-obat/add', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('Data berhasil ditambahkan:', response.data);
        } catch (error) {
          console.error('Terjadi kesalahan:', error);
        }
    
        setIsDialogOpen(false)
        setImagePreview(null)
      }
    
      const handleFileChange = (event) => {
        const file = event.target.files?.[0]
        if (file) {
          const reader = new FileReader()
          reader.onloadend = () => {
            setImagePreview(reader.result )
          }
          reader.readAsDataURL(file)
        }
      }
    
      const handleRemoveImage = () => {
        setImagePreview(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    <DialogTrigger asChild>
      <Button>
        <PlusIcon className="mr-2 h-4 w-4" /> Create New
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Tambah</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Judul
            </Label>
            <Input id="title" name="title" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="content" className="text-right">
              Isi
            </Label>
            <Textarea id="content" name="content" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Upload gambar
            </Label>
            <div className="col-span-3">
              <Input 
                id="image" 
                type="file" 
                name="image"
                className="hidden" 
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              {imagePreview ? (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Label htmlFor="image" className="cursor-pointer flex items-center justify-center w-full h-32 border-2 border-dashed rounded-md">
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Choose file
                </Label>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
  )
}

export default DialogUpload