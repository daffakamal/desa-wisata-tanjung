'use client'

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import AdminLayout from "./layout"
import DialogUpload from "./dialogUpload"
import { logout } from "@/app/auth/services/auth"
import { useEffect, useState } from "react"
import axios from "axios"
import { Trash2 } from "lucide-react"
import toast from "react-hot-toast"

const fetchData = async (setTabData, setActiveTab, activeTab) => {
    try {
        const response = await axios.get("/in/data")
        const rawData = response.data

        const formattedData = [
            {
                id: "tanaman-obat",
                label: "Toga",
                items: rawData.tanamanObat.map((item) => ({
                    id: item.id,
                    title: item.title,
                    image: item.image,
                })),
            },
            {
                id: "umkm",
                label: "UMKM",
                items: rawData.umkm.map((item) => ({
                    id: item.id,
                    title: item.title,
                    image: item.image || "/placeholder.svg?height=200&width=300",
                })),
            },
            {
                id: "kesenian",
                label: "Kesenian",
                items: rawData.kesenian.map((item) => ({
                    id: item.id,
                    title: item.title,
                    image: item.image || "/placeholder.svg?height=200&width=300",
                })),
            },
            {
                id: "gallery",
                label: "Gallery",
                items: rawData.gallery.map((item) => ({
                    id: item.id,
                    title: item.title,
                    image: item.image || "/placeholder.svg?height=200&width=300",
                })),
            },
            {
                id: "cafe",
                label: "Cafe",
                items: rawData.cafe.map((item) => ({
                    id: item.id,
                    title: item.title,
                    image: item.image || "/placeholder.svg?height=200&width=300",
                })),
            },
        ]

        setTabData(formattedData)
        setActiveTab(activeTab || formattedData[0].id)
    } catch (error) {
        console.error("Error fetching data:", error)
    }
}

export default function DashboardDemo() {
  const [tabData, setTabData] = useState([])
  const [activeTab, setActiveTab] = useState("tanaman-obat")

  useEffect(() => {
      fetchData(setTabData, setActiveTab)
  }, [])

  const handleDelete = async (itemId) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus item ini?");
    if (!confirmDelete) return;

    try {
      const endpoints = {
        'tanaman-obat': '/in/tanaman-obat',
        'umkm': '/in/umkm',
        'kesenian': '/in/kesenian',
        'gallery': '/in/gallery',
        'cafe': '/in/cafe'
      }

      const endpoint = endpoints[activeTab]
      if (!endpoint) {
        console.error('Invalid tab')
        return
      }

      // Send delete request
      await axios.delete(`${endpoint}/${itemId}`)

      toast.success('Data berhasil dihapus')

      // Refresh data after successful deletion
      fetchData(setTabData, setActiveTab, activeTab)
    } catch (error) {
      console.error('Error deleting item:', error)
      toast.error(error.response?.data?.message || error.message || 'Terjadi kesalahan')
    }
  }

  return (
    <AdminLayout>
      <div className="w-full max-w-7xl mx-auto p-4">
        <header className="flex justify-between items-center mb-6 bg-gray-800 text-white p-4 rounded-lg">
          <h1 className="text-2xl font-bold">Dashboard Admin</h1>
          <nav>
          <button className="flex items-center text-white" onClick={logout}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" x2="9" y1="12" y2="12"/>
            </svg>
          </button>
          </nav>
        </header>

        <div className="flex justify-between items-center mb-6">
          <Tabs defaultValue={activeTab} className="w-full">
            <div className="flex md:flex-row flex-col md:gap-0 gap-4 justify-between md:items-center mb-4">
              <TabsList className="grid md:w-2/3 grid-cols-5">
                {tabData.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id} onClick={() => setActiveTab(tab.id)}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <DialogUpload activeTab={activeTab} onSuccess={() => { fetchData(setTabData, setActiveTab) }}  />
            </div>

            {tabData.map((tab) => (
              <TabsContent key={tab.id} value={tab.id}>
                <ScrollArea className="h-[calc(100vh-200px)] pr-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {tab.items.map((item, index) => (
                      <Card key={index} className="relative group">
                        <CardContent className="p-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-48 object-cover rounded-t-xl"
                          />
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </CardContent>
                        <CardFooter className="justify-center bg-opacity-70">
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
    </AdminLayout>
  )
}