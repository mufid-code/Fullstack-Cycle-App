# Cycle

**Cycle** adalah sebuah website social media yang merupakan kloning dari platform **Threads**. Proyek ini menyediakan berbagai fitur seperti pencarian, otentikasi , pembuatan dan melihat thread, edit profil, mengikuti dan diikuti pengguna, serta detail thread dan balasan.

# Link
- **Deploy** : https://fe-cycle-app.vercel.app/
- **Figma** : https://www.figma.com/design/hNBgebXElHQ7Uvt1UWp7m1/Circle-App?node-id=2-2&t=jXZaCeSwwUYTLJkK-0
- 
## Fitur Utama
1. **Pencarian (Search)** - Cari thread atau pengguna berdasarkan kata kunci.
2. **Buat Thread (Create Thread)** - Pengguna dapat membuat thread baru.
3. **Lihat Thread (View Threads)** - Melihat daftar thread yang ada.
4. **Otentikasi (Auth)** - Sistem login, registrasi, dan reset password.
5. **Edit Profil (Edit Profile)** - Pengguna dapat mengubah informasi profil mereka.
6. **Mengikuti & Pengikut (Following & Follower)** - Fitur untuk melihat dan mengelola daftar yang diikuti dan pengikut.
7. **Detail Thread dan Balasan (Thread Details and Replies)** - Tampilan detail dari thread beserta balasan dari pengguna lain.

## Teknologi yang Digunakan
- **Frontend**: React, TypeScript, Vite, Chakra UI
- **State Management**: Redux (dengan `useAppSelector`) , tanStack 
- **Form Validation**: Zod
- **Routing**: React Router
- **Backend**: Node.js, Express, Postgres , Nodemail 

## Instalasi dan Menjalankan Proyek
1. Clone repositori:
   ```bash
   git clone https://github.com/mufid-code/fullstack-cycle-app.git
   cd cycle
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Jalankan server lokal:
   ```bash
   npm run dev
   ```

## Dokumentasi Tampilan Fitur

| Fitur                       | Deskripsi Tampilan                                                                                     |
|-----------------------------|--------------------------------------------------------------------------------------------------------|
| **Halaman Login**            | Form login dengan input email dan password serta tombol login. Dilengkapi dengan link untuk reset password. |
| **Halaman Register**         | Form registrasi dengan input nama, email, dan password, serta tombol untuk submit.                     |
| **Halaman Home**             | Tampilkan feed thread dari pengguna yang diikuti. Ada opsi untuk membuat thread baru.                  |
| **Buat Thread**              | Form untuk menulis thread baru, dilengkapi dengan tombol post.                                          |
| **Pencarian**                | Input untuk pencarian thread atau pengguna, menampilkan hasil pencarian di bawahnya.                   |
| **Profil Pengguna**          | Tampilkan informasi pengguna (bio, avatar) dengan tombol untuk mengedit profil dan daftar thread pengguna. |
| **Edit Profil**              | Form untuk mengubah nama, bio, dan foto profil.                                                        |
| **Detail Thread**            | Tampilkan konten thread lengkap dengan balasan dari pengguna lain, beserta tombol balas.               |
| **Pengikut & Mengikuti**     | Daftar pengguna yang mengikuti dan diikuti, dengan tombol untuk mengikuti/mengikuti kembali.           |

## Contribusi
Jika Anda ingin berkontribusi pada proyek ini, silakan lakukan langkah berikut:
1. Fork repositori ini.
2. Buat branch fitur baru (`git checkout -b fitur-baru`).
3. Commit perubahan Anda (`git commit -m 'Menambahkan fitur baru'`).
4. Push ke branch (`git push origin fitur-baru`).
5. Buat pull request.
