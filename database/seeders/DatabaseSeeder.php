<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        DB::table('languages')->insert([

            ['name' => 'Srpski latinica', 'image' => 'serbia.png', 'slug' => 'sr'],
            ['name' => 'Српски ћирилица',  'image' => 'serbia.png', 'slug' => 'sr_cir'],
            ['name' => 'Hrvatski', 'image' => 'croatia.png', 'slug' => 'hr'],
            ['name' => 'Slovenščina',  'image' => 'slovenia.png', 'slug' => 'slo'],
        ]);

        DB::table('subjects')->insert([
            ['name' => 'Srpski', 'image' => 'https://professionalenglish.rs/wp-content/uploads/2020/01/slika-blog-1.jpg', 'language_slug' => 'sr'],
            ['name' => 'Matematika', 'image' => 'https://t3.ftcdn.net/jpg/02/28/93/86/360_F_228938670_6fqDkXHDva9Up2yu7pQG9iecxqeJGZgC.jpg', 'language_slug' => 'sr'],
            ['name' => 'Priroda i društvo', 'image' => 'https://goricamilacic.e-teachers.me/wp-content/uploads/2022/05/pd-01.jpg', 'language_slug' => 'sr'],
            ['name' => 'Српски', 'image' => 'https://professionalenglish.rs/wp-content/uploads/2020/01/slika-blog-1.jpg', 'language_slug' => 'sr_cir'],
            ['name' => 'Математика', 'image' => 'https://t3.ftcdn.net/jpg/02/28/93/86/360_F_228938670_6fqDkXHDva9Up2yu7pQG9iecxqeJGZgC.jpg', 'language_slug' => 'sr_cir'],
            ['name' => 'Природа и друштво', 'image' => 'https://goricamilacic.e-teachers.me/wp-content/uploads/2022/05/pd-01.jpg', 'language_slug' => 'sr_cir'],

        ]);

        DB::table('lessons')->insert([
            ['name' => 'Slova', 'image' => 'letters.png', 'subject_id' => 1],
            ['name' => 'Čitanje', 'image' => 'reading.png', 'subject_id' => 1],
            ['name' => 'Pisanje', 'image' => 'writing.png', 'subject_id' => 1],

        ]);

        DB::table('users')->insert([
            'name' => 'Admin User',
            'email' => 'admin@admin.com',
            'password' => Hash::make('password'), // Uverite se da koristite jaku lozinku

        ]);

        DB::table('questions')->insert([
            'title' => 'Odaberi tačan odgovor!',
            'audio' => 'dog.mp3',
            'question' => 'Koja životinja se čuje?',
            'answers' =>  json_encode([
                ['text' => 'Pas', 'isTrue' => true, 'image' => 'dog.png'],
                ['text' => 'Konj', 'isTrue' => false,  'image' => 'horse.png'],
                ['text' => 'Mačka', 'isTrue' => false,  'image' => 'cat.png'],
                ['text' => 'Ptica', 'isTrue' => false, 'image' => 'bird.png'],
            ]),
        ]);
    }
}
