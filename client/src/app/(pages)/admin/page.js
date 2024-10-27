
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
import DialogUpload from "./upload"
import { logout } from "@/app/auth/services/auth"


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

  return (
    <AdminLayout>

    <div className="w-full max-w-7xl mx-auto p-4">
      <header className="flex justify-between items-center mb-6 bg-gray-800 text-white p-4 rounded-lg">
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <nav>

        <button className="flex items-center text-white" onClick={logout}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
        </button>

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

            <DialogUpload />

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
    </AdminLayout>
  )
}