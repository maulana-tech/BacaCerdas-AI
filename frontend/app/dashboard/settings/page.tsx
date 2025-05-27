// app/dashboard/settings/page.tsx
"use client"

import { useSettings } from "./contexts/settings-context" // Tetap impor useSettings
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Slider } from "@/components/ui/slider"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Checkbox } from "@/components/ui/checkbox"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Laptop, Smartphone, Tablet } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { DashboardContent } from "../components/dashboard-content"



const defaultAvatars = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9439775.jpg-4JVJWOjPksd3DtnBYJXoWHA5lc1DU9.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238208_11475222.jpg-poEIzVHAGiIfMFQ7EiF8PUG1u0Zkzz.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-4MCwPC2Bec6Ume26Yo1kao3CnONxDg.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9720029.jpg-Yf9h2a3kT7rYyCb648iLIeHThq5wEy.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/27470341_7294795.jpg-XE0zf7R8tk4rfA1vm4fAHeZ1QoVEOo.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/799.jpg-0tEi4Xvg5YsFoGoQfQc698q4Dygl1S.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334228.jpg-eOsHCkvVrVAwcPHKYSs5sQwVKsqWpC.jpeg",
]

// Bungkus konten spesifik pengaturan dalam komponen terpisah
function SettingsPageContent() {
  const { settings, updateSettings, updateNotificationSettings, updatePrivacySettings } = useSettings()
  const [selectedAvatar, setSelectedAvatar] = useState(settings.avatar)

  const handleSaveAccount = () => {
    updateSettings({
      avatar: selectedAvatar,
      fullName: settings.fullName,
      email: settings.email,
      phone: settings.phone,
      timezone: settings.timezone,
    })
    toast.success("Account settings saved successfully")
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSaveNotifications = () => {
    updateNotificationSettings(settings.notifications)
    toast.success("Notification settings saved successfully")
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSavePrivacy = () => {
    updatePrivacySettings(settings.privacy)
    toast.success("Privacy settings saved successfully")
  }

  return (
    <div className="flex-1 space-y-4 sm:space-y-6 p-4 sm:p-6 lg:p-8 pt-4 sm:pt-6"> {/* Hapus container mx-auto py-10 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Pengaturan</h2>
      </div>
      
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
          <TabsTrigger value="account" className="text-xs sm:text-sm">Akun</TabsTrigger>
          <TabsTrigger value="preferences" className="text-xs sm:text-sm">Preferensi</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs sm:text-sm">Notifikasi</TabsTrigger>
          <TabsTrigger value="privacy" className="text-xs sm:text-sm">Privasi</TabsTrigger>
          <TabsTrigger value="security" className="text-xs sm:text-sm">Keamanan</TabsTrigger>
          <TabsTrigger value="billing" className="text-xs sm:text-sm">Billing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Informasi Akun</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Kelola informasi profil dan pengaturan akun Anda.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="space-y-4">
                <Label>Current Avatar</Label>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={selectedAvatar} alt={settings.fullName} />
                    <AvatarFallback>
                      {settings.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <Label>Choose a new avatar</Label>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {defaultAvatars.map((avatar, index) => (
                    <Avatar
                      key={index}
                      className={`h-20 w-20 rounded-lg cursor-pointer hover:ring-2 hover:ring-primary shrink-0 ${
                        selectedAvatar === avatar ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedAvatar(avatar)}
                    >
                      <AvatarImage src={avatar} alt={`Avatar ${index + 1}`} className="object-cover" />
                      <AvatarFallback>{index + 1}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div>
                  <Label htmlFor="custom-avatar">Or upload a custom avatar</Label>
                  <Input id="custom-avatar" type="file" accept="image/*" className="mt-1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input
                  id="full-name"
                  value={settings.fullName}
                  onChange={(e) => updateSettings({ fullName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => updateSettings({ email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => updateSettings({ phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={settings.timezone} onValueChange={(value) => updateSettings({ timezone: value })}>
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select Timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc-12">International Date Line West (UTC-12)</SelectItem>
                    <SelectItem value="utc-11">Samoa Standard Time (UTC-11)</SelectItem>
                    <SelectItem value="utc-10">Hawaii-Aleutian Standard Time (UTC-10)</SelectItem>
                    <SelectItem value="utc-9">Alaska Standard Time (UTC-9)</SelectItem>
                    <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                    <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                    <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                    <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                    <SelectItem value="utc-4">Atlantic Time (UTC-4)</SelectItem>
                    <SelectItem value="utc-3">Argentina Standard Time (UTC-3)</SelectItem>
                    <SelectItem value="utc-2">South Georgia Time (UTC-2)</SelectItem>
                    <SelectItem value="utc-1">Azores Time (UTC-1)</SelectItem>
                    <SelectItem value="utc+0">Greenwich Mean Time (UTC+0)</SelectItem>
                    <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                    <SelectItem value="utc+2">Eastern European Time (UTC+2)</SelectItem>
                    <SelectItem value="utc+3">Moscow Time (UTC+3)</SelectItem>
                    <SelectItem value="utc+4">Gulf Standard Time (UTC+4)</SelectItem>
                    <SelectItem value="utc+5">Pakistan Standard Time (UTC+5)</SelectItem>
                    <SelectItem value="utc+5.5">Indian Standard Time (UTC+5:30)</SelectItem>
                    <SelectItem value="utc+6">Bangladesh Standard Time (UTC+6)</SelectItem>
                    <SelectItem value="utc+7">Indochina Time (UTC+7)</SelectItem>
                    <SelectItem value="utc+8">China Standard Time (UTC+8)</SelectItem>
                    <SelectItem value="utc+9">Japan Standard Time (UTC+9)</SelectItem>
                    <SelectItem value="utc+10">Australian Eastern Standard Time (UTC+10)</SelectItem>
                    <SelectItem value="utc+11">Solomon Islands Time (UTC+11)</SelectItem>
                    <SelectItem value="utc+12">New Zealand Standard Time (UTC+12)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveAccount}>Save Account Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Tambahkan TabsContent untuk Preferences, Notifications, Privacy, Security, Billing */}
        {/* Ini hanyalah placeholder, Anda bisa mengisi konten sebenarnya di sini */}
        <TabsContent value="preferences" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Preferensi Aplikasi</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Sesuaikan tampilan dan perilaku aplikasi.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <p className="text-muted-foreground">Preferensi pengaturan akan datang...</p>
              {/* Tambahkan opsi preferensi di sini */}
            </CardContent>
            <CardFooter>
              <Button>Simpan Preferensi</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Pengaturan Notifikasi</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Kelola bagaimana Anda menerima notifikasi.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <p className="text-muted-foreground">Pengaturan notifikasi akan datang...</p>
              {/* Tambahkan opsi notifikasi di sini */}
            </CardContent>
            <CardFooter>
              <Button>Simpan Notifikasi</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Pengaturan Privasi</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Kelola bagaimana data Anda digunakan dan dibagikan.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <p className="text-muted-foreground">Pengaturan privasi akan datang...</p>
              {/* Tambahkan opsi privasi di sini */}
            </CardContent>
            <CardFooter>
              <Button>Simpan Privasi</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Pengaturan Keamanan</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Kelola keamanan akun Anda.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <p className="text-muted-foreground">Pengaturan keamanan akan datang...</p>
              {/* Tambahkan opsi keamanan di sini */}
            </CardContent>
            <CardFooter>
              <Button>Simpan Keamanan</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Informasi Billing</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Kelola paket langganan dan metode pembayaran.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <p className="text-muted-foreground">Informasi billing akan datang...</p>
              {/* Tambahkan opsi billing di sini */}
            </CardContent>
            <CardFooter>
              <Button>Simpan Billing</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Halaman utama untuk rute /dashboard/settings
export default function SettingsPage() {
  return (
    <DashboardContent>
      <SettingsPageContent />
    </DashboardContent>
  )
}