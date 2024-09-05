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
            ['name' => 'Srpski', 'image' => 'alphabet.png', 'language_id' => '1'],
            ['name' => 'Matematika', 'image' => 'math.png', 'language_id' => '1'],
            ['name' => 'Priroda i društvo', 'image' =>  'geo.png', 'language_id' => '1'],
            ['name' => 'Српски', 'image' => 'alphabet.png', 'language_id' => '2'],
            ['name' => 'Математика', 'image' => 'math.png', 'language_id' => '2'],
            ['name' => 'Природа и друштво', 'image' => 'geo.png', 'language_id' => '2'],

        ]);

        DB::table('lessons')->insert([
            ['name' => 'Slova', 'image' => 'letters.png', 'subject_id' => 1],
            ['name' => 'Čitanje', 'image' => 'reading.png', 'subject_id' => 1],
            ['name' => 'Pisanje', 'image' => 'writing.png', 'subject_id' => 1],

        ]);
        DB::table('exercises')->insert([
            ['name' => 'Slovo A', 'image' => 'letters.png', 'lesson_id' => 1],
            ['name' => 'Slovo B', 'image' => 'letters.png', 'lesson_id' => 1],

        ]);

        DB::table('users')->insert([
            'name' => 'Admin User',
            'email' => 'admin@admin.com',
            'password' => Hash::make('password'),
            'language_id' => 1,

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
