<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

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

        DB::table('subjects')->insert([
            ['name' => 'Srpski', 'image' => 'https://professionalenglish.rs/wp-content/uploads/2020/01/slika-blog-1.jpg'],
            ['name' => 'Matematika', 'image' => 'https://t3.ftcdn.net/jpg/02/28/93/86/360_F_228938670_6fqDkXHDva9Up2yu7pQG9iecxqeJGZgC.jpg'],
            ['name' => 'Priroda i društvo', 'image' => 'https://goricamilacic.e-teachers.me/wp-content/uploads/2022/05/pd-01.jpg'],

        ]);
    }
}
