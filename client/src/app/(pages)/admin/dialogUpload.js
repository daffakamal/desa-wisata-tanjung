'use client'

import React, { useState, useRef } from "react"
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
import { toast } from "react-hot-toast"
import { Select } from "@/components/ui/select"

const DialogUpload = ({ activeTab, onSuccess }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef(null)

    // Data state
    const [tanamanObatForm, setTanamanObatForm] = useState({
        tanaman: "",
        namaLatin: "",
        deskripsi: "",
        manfaat: "",
        bentukOlahan: ""
    })
    const [kesenianForm, setKesenianForm] = useState({
        kesenian: "",
        kesenianDeskripsi: ""
    })
    const [umkmForm, setUmkmForm] = useState({
        umkm: "",
        usaha: "",
        alamat: "",
        nomor: "",
        kategori: ""
    })
    const [cafeForm, setCafeForm] = useState({
        menu: "",
        harga: ""
    })
    const [galleryForm, setGalleryForm] = useState({
        tanaman: "",
        deskripsi: ""
    })

    const resetForm = () => {
        setTanamanObatForm({
            tanaman: "",
            namaLatin: "",
            deskripsi: "",
            manfaat: "",
            bentukOlahan: ""
        })
        setKesenianForm({
            kesenian: "",
            kesenianDeskripsi: ""
        })
        setUmkmForm({
            umkm: "",
            usaha: "",
            alamat: "",
            nomor: "",
            kategori: ""
        })
        setCafeForm({
            menu: "",
            harga: ""
        })
        setGalleryForm({
            tanaman: "",
            deskripsi: ""
        })
        setImagePreview(null)
        setImage(null)
        setLoading(false)
    }

    const handleInputChange = (e, formType) => {
        const { id, value } = e.target
        switch (formType) {
            case 'tanamanObat':
                setTanamanObatForm(prev => ({
                    ...prev,
                    [id]: value
                }))
                break
            case 'kesenian':
                setKesenianForm(prev => ({
                    ...prev,
                    [id]: value
                }))
                break
            case 'umkm':
                setUmkmForm(prev => ({
                    ...prev,
                    [id]: value
                }))
                break
            case 'cafe':
                setCafeForm(prev => ({
                    ...prev,
                    [id]: id === 'harga' ? parseFloat(value) || '' : value
                }))
                break
            case 'gallery':
                setGalleryForm(prev => ({
                    ...prev,
                    [id]: value
                }))
                break
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files?.[0]
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Ukuran file terlalu besar. Maksimum 5MB')
                return
            }

            if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
                toast.error('Format file tidak didukung. Gunakan JPEG, PNG, atau JPG')
                return
            }

            const reader = new FileReader()
            reader.onloadend = () => setImagePreview(reader.result)
            reader.readAsDataURL(file)
            setImage(file)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

        try {
            if (!image) {
                throw new Error('Harap upload gambar')
            }

            const formData = new FormData()
            formData.append('gambar', image)

            // Append data sesuai kategori aktif
            if (activeTab === "tanaman-obat") {
                if (!tanamanObatForm.tanaman || !tanamanObatForm.namaLatin) {
                    throw new Error('Nama tanaman dan nama latin wajib diisi')
                }
                Object.keys(tanamanObatForm).forEach(key => {
                    formData.append(key, tanamanObatForm[key])
                })
            } else if (activeTab === "kesenian") {
                if (!kesenianForm.kesenian) {
                    throw new Error('Nama kesenian wajib diisi')
                }
                Object.keys(kesenianForm).forEach(key => {
                    formData.append(key, kesenianForm[key])
                })
            } else if (activeTab === "umkm") {
                if (!umkmForm.umkm || !umkmForm.usaha) {
                    throw new Error('Nama UMKM dan jenis usaha wajib diisi')
                }
                Object.keys(umkmForm).forEach(key => {
                    formData.append(key, umkmForm[key])
                })
            } else if (activeTab === "cafe") {
                if (!cafeForm.menu || !cafeForm.harga) {
                    throw new Error('Menu dan harga wajib diisi')
                }
                Object.keys(cafeForm).forEach(key => {
                    formData.append(key, cafeForm[key])
                })
            } else if (activeTab === "gallery") {
                if (!galleryForm.tanaman) {
                    throw new Error('Nama tanaman wajib diisi')
                }
                Object.keys(galleryForm).forEach(key => {
                    formData.append(key, galleryForm[key])
                })
            }

            const response = await axios.post(`/in/${activeTab}/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (response.data) {
                toast.success('Data berhasil ditambahkan')
                setIsDialogOpen(false)
                resetForm()
                if (onSuccess) onSuccess()
            }
        } catch (error) {
            console.error("Error submitting form:", error)
            toast.error(error.response?.data?.message || error.message || 'Terjadi kesalahan')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) resetForm()
        }}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon className="mr-2 h-4 w-4" /> Create New
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Tambah {
                                activeTab === "umkm" ? "UMKM" : 
                                activeTab === "tanaman-obat" ? "Tanaman Obat" : 
                                activeTab === "cafe" ? "Menu Cafe" :
                                activeTab === "gallery" ? "Gallery" : 
                                activeTab === "kesenian" ? "Kesenian" :
                                ""
                            }
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Image Upload Section */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="image" className="text-right">
                                Upload gambar *
                            </Label>
                            <div className="col-span-3">
                                <Input 
                                    id="image" 
                                    type="file" 
                                    onChange={handleFileChange}
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/jpeg,image/png,image/jpg"
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
                                            onClick={() => {
                                                setImagePreview(null)
                                                setImage(null)
                                            }}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <Label 
                                        htmlFor="image" 
                                        className="cursor-pointer flex items-center justify-center w-full h-32 border-2 border-dashed rounded-md hover:border-primary"
                                    >
                                        <UploadIcon className="mr-2 h-4 w-4" />
                                        Pilih Gambar
                                    </Label>
                                )}
                            </div>
                        </div>

                        {/* Form Fields untuk Tanaman Obat */}
                        {activeTab === "tanaman-obat" && (
                            <>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="tanaman" className="text-right">Tanaman *</Label>
                                    <Input
                                        id="tanaman"
                                        className="col-span-3"
                                        value={tanamanObatForm.tanaman}
                                        onChange={(e) => handleInputChange(e, 'tanamanObat')}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="namaLatin" className="text-right">Nama Latin *</Label>
                                    <Input
                                        id="namaLatin"
                                        className="col-span-3"
                                        value={tanamanObatForm.namaLatin}
                                        onChange={(e) => handleInputChange(e, 'tanamanObat')}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="deskripsi" className="text-right">Deskripsi</Label>
                                    <Textarea
                                        id="deskripsi"
                                        className="col-span-3"
                                        value={tanamanObatForm.deskripsi}
                                        onChange={(e) => handleInputChange(e, 'tanamanObat')}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="manfaat" className="text-right">Manfaat</Label>
                                    <Textarea
                                        id="manfaat"
                                        className="col-span-3"
                                        value={tanamanObatForm.manfaat}
                                        onChange={(e) => handleInputChange(e, 'tanamanObat')}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="bentukOlahan" className="text-right">Bentuk Olahan</Label>
                                    <Textarea
                                        id="bentukOlahan"
                                        className="col-span-3"
                                        value={tanamanObatForm.bentukOlahan}
                                        onChange={(e) => handleInputChange(e, 'tanamanObat')}
                                    />
                                </div>
                            </>
                        )}

                        {/* Form Fields untuk Kesenian */}
                        {activeTab === "kesenian" && (
                            <>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="kesenian" className="text-right">Kesenian *</Label>
                                    <Input
                                        id="kesenian"
                                        className="col-span-3"
                                        value={kesenianForm.kesenian}
                                        onChange={(e) => handleInputChange(e, 'kesenian')}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="kesenianDeskripsi" className="text-right">Deskripsi</Label>
                                    <Textarea
                                        id="kesenianDeskripsi"
                                        className="col-span-3"
                                        value={kesenianForm.kesenianDeskripsi}
                                        onChange={(e) => handleInputChange(e, 'kesenian')}
                                    />
                                </div>
                            </>
                        )}

                        {/* Form Fields untuk UMKM */}
                        {activeTab === "umkm" && (
                            <>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="umkm" className="text-right">UMKM *</Label>
                                    <Input
                                        id="umkm"
                                        className="col-span-3"
                                        value={umkmForm.umkm}
                                        onChange={(e) => handleInputChange(e, 'umkm')}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="usaha" className="text-right">Usaha *</Label>
                                    <Textarea
                                        id="usaha"
                                        className="col-span-3"
                                        value={umkmForm.usaha}
                                        onChange={(e) => handleInputChange(e, 'umkm')}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="alamat" className="text-right">Alamat</Label>
                                    <Input
                                        id="alamat"
                                        className="col-span-3"
                                        value={umkmForm.alamat}
                                        onChange={(e) => handleInputChange(e, 'umkm')}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="nomor" className="text-right">Nomor</Label>
                                    <Input
                                        id="nomor"
                                        className="col-span-3"
                                        value={umkmForm.nomor}
                                        onChange={(e) => handleInputChange(e, 'umkm')}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="kategori" className="text-right">Kategori</Label>
                                    <Input
                                        id="kategori"
                                        className="col-span-3"
                                        value={umkmForm.kategori}
                                        onChange={(e) => handleInputChange(e, 'umkm')}
                                    />
                                </div>
                            </>
                        )}

                        {/* Form Fields untuk Cafe */}
                        {activeTab === "cafe" && (
                            <>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="menu" className="text-right">Menu *</Label>
                                    <Input
                                        id="menu"
                                        className="col-span-3"
                                        value={cafeForm.menu}
                                        onChange={(e) => handleInputChange(e, 'cafe')}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="kategori" className="text-right">Kategori *</Label>
                                    <Select
                                        id="kategori"
                                        className="col-span-3"
                                        value={cafeForm.kategori}
                                        onChange={(e) => handleInputChange(e, 'cafe')}
                                        required
                                    >
                                        <Select>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Pilih Kategori" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectGroup>
                                              <SelectItem value="Kopi">Kopi</SelectItem>
                                              <SelectItem value="Non Kopi">Non Kopi</SelectItem>
                                              <SelectItem value="Teh">Teh</SelectItem>
                                              <SelectItem value="Jamu">Jamu</SelectItem>
                                            </SelectGroup>
                                          </SelectContent>
                                        </Select>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="harga" className="text-right">Harga *</Label>
                                    <Input
                                        id="harga"
                                        type="number"
                                        className="col-span-3"
                                        value={cafeForm.harga}
                                        onChange={(e) => handleInputChange(e, 'cafe')}
                                        required
                                    />
                                </div>
                            </>
                        )}

                        {/* Form Fields untuk Gallery */}
                        {activeTab === "gallery" && (
                            <>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="tanaman" className="text-right">Tanaman</Label>
                                    <Input
                                        id="tanaman"
                                        className="col-span-3"
                                        value={galleryForm.tanaman}
                                        onChange={(e) => handleInputChange(e, 'gallery')}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="deskripsi" className="text-right">Deskripsi</Label>
                                    <Textarea
                                        id="deskripsi"
                                        className="col-span-3"
                                        value={galleryForm.deskripsi}
                                        onChange={(e) => handleInputChange(e, 'gallery')}
                                        required
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setIsDialogOpen(false)}
                        >
                            Batal
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={loading}
                        >
                            {loading ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default DialogUpload