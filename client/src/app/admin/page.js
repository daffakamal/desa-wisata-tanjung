'use client'

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusIcon, UploadIcon, X } from "lucide-react"

// Example data for tabs and cards
const tabData = [
  { id: "umkm", label: "UMKM", items: [
    { title: "Warung Ibu Siti", image: "/placeholder.svg?height=200&width=300" },
    { title: "Warung Ibu Siti", image: "/placeholder.svg?height=200&width=300" },
    { title: "Warung Ibu Siti", image: "/placeholder.svg?height=200&width=300" },
    { title: "Warung Ibu Siti", image: "/placeholder.svg?height=200&width=300" },
    { title: "Warung Ibu Siti", image: "/placeholder.svg?height=200&width=300" },
    { title: "Warung Ibu Siti", image: "/placeholder.svg?height=200&width=300" },
    { title: "Warung Ibu Siti", image: "/placeholder.svg?height=200&width=300" },
    { title: "Warung Ibu Siti", image: "/placeholder.svg?height=200&width=300" },
    { title: "Kerajinan Bambu Pak Joko", image: "/placeholder.svg?height=200&width=300" },
    { title: "Batik Tulis Ibu Rina", image: "/placeholder.svg?height=200&width=300" },
  ]},
  { id: "agro", label: "Agro", items: [
    { title: "Kebun Stroberi", image: "/placeholder.svg?height=200&width=300" },
    { title: "Sawah Organik", image: "/placeholder.svg?height=200&width=300" },
    { title: "Peternakan Sapi Perah", image: "/placeholder.svg?height=200&width=300" },
  ]},
  { id: "kesenian", label: "Kesenian", items: [
    { title: "Tari Topeng", image: "/placeholder.svg?height=200&width=300" },
    { title: "Wayang Kulit", image: "/placeholder.svg?height=200&width=300" },
    { title: "Musik Angklung", image: "/placeholder.svg?height=200&width=300" },
  ]},
  { id: "gallery", label: "Gallery", items: [
    { title: "Pemandangan Alam", image: "/placeholder.svg?height=200&width=300" },
    { title: "Kegiatan Masyarakat", image: "/placeholder.svg?height=200&width=300" },
    { title: "Festival Tahunan", image: "/placeholder.svg?height=200&width=300" },
  ]},
  { id: "cafe", label: "Cafe", items: [
    { title: "Kopi Luwak", image: "/placeholder.svg?height=200&width=300" },
    { title: "Warung Mie Ayam", image: "/placeholder.svg?height=200&width=300" },
    { title: "Kedai Es Krim Tradisional", image: "/placeholder.svg?height=200&width=300" },
  ]},
  { id: "lembaga", label: "Lembaga", items: [
    { title: "Balai Desa", image: "/placeholder.svg?height=200&width=300" },
    { title: "Koperasi Tani", image: "/placeholder.svg?height=200&width=300" },
    { title: "Pusat Kesehatan Desa", image: "/placeholder.svg?height=200&width=300" },
  ]},
]

export default function DashboardDemo() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    // Handle form submission here
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
    <div className="w-full max-w-7xl mx-auto p-4">
      <header className="flex justify-between items-center mb-6 bg-gray-800 text-white p-4 rounded-lg">
        <h1 className="text-2xl font-bold">Desa Wisata Tanjung</h1>
        <nav>
          {/* <ul className="flex space-x-4">
            <li>Notifications</li>
            <li>Content</li>
            <li>Analytics</li>
          </ul> */}
        </nav>
      </header>

      <div className="flex justify-between items-center mb-6">
        <Tabs defaultValue={tabData[0].id} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList className="grid w-2/3 grid-cols-6">
              {tabData.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id}>{tab.label}</TabsTrigger>
              ))}
            </TabsList>
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
                      <Input id="title" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="content" className="text-right">
                        Isi
                      </Label>
                      <Textarea id="content" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="image" className="text-right">
                        Upload gambar
                      </Label>
                      <div className="col-span-3">
                        <Input 
                          id="image" 
                          type="file" 
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
          </div>

          {tabData.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              <ScrollArea className="h-[calc(100vh-200px)] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {tab.items.map((item, index) => (
                    <Card key={index}>
                      <CardContent className="p-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover"
                        />
                      </CardContent>
                      <CardFooter className="justify-center">
                        <p>{item.title}</p>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}