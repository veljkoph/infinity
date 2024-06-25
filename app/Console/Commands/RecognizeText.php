<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class RecognizeText extends Command
{
    protected $signature = 'recognize:text {image}';
    protected $description = 'Recognize text from an image using a Python script';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $imagePath = $this->argument('image');
        $output = null;
        $resultCode = null;

        exec("python3 recognize.py " . escapeshellarg($imagePath), $output, $resultCode);

        if ($resultCode !== 0) {
            $this->error('Error recognizing text.');
            return 1;
        }

        $recognizedText = implode("\n", $output);
        $this->info("Recognized text: " . $recognizedText);

        return 0;
    }
}
