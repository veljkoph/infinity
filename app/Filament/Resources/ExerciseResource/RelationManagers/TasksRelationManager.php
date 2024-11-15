<?php

namespace App\Filament\Resources\ExerciseResource\RelationManagers;

use Closure;
use Filament\Forms;
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TasksRelationManager extends RelationManager
{
    protected static string $relationship = 'tasks';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make(__('Osnovni podaci'))->columns(3)
                    ->columnSpan(3)->schema([
                        Select::make('type')
                            ->options([
                                'drag_and_drop' => 'Prevlačenje',
                                'drawing' => 'Crtanje Slova/Reči',
                                'question' => 'Pitanja sa odgovorima',
                                'connect_lines' => 'Povezivanje',
                                'sorting' => 'Sortiranje',
                                'sorting_columns' => 'Sortiranje u kolone',
                            ])
                            ->required()
                            ->label('Tip zadatka'),

                        TextInput::make('title')
                            ->required()
                            ->label('Naslov (Npr. Klikni na tačan odgovor, Prevuci, Nacrtaj)'),
                    ])->reactive(),
                Section::make(__('PITANJA I ODGOVORI'))->columns(1)
                    ->columnSpan(2)->visible(fn($get) => $get('type') === 'question')->schema([
                        TextInput::make('question')
                            ->required()
                            ->label('Pitanje'),
                        FileUpload::make('sound')
                            ->label('Zvuk')
                            ->acceptedFileTypes(['audio/*'])
                            ->directory('sounds')
                            ->maxSize(10240),
                        Repeater::make('answers')
                            ->label('Odgovori')
                            ->minItems(2)
                            ->maxItems(4)->cloneable()
                            ->schema([
                                TextInput::make('answer')
                                    ->label('Odgovor')
                                    ->placeholder('Unesite odgovor'),
                                FileUpload::make('image')->label('Slika'),
                                Checkbox::make('isTrue')
                                    ->label('Da li je tačno?')
                                    ->default(false),
                            ])->rules('required_without_all:answers.*.answer,answers.*.image')
                    ]),
                Section::make(__('PREVLACENJE'))->columns(1)
                    ->columnSpan(2)->visible(fn($get) => $get('type') === 'drag_and_drop')->schema([

                        Repeater::make('answers')
                            ->label('Questions and Answers')
                            ->schema([
                                TextInput::make('id')
                                    ->label('ID')
                                    ->default(fn() => (string) \Illuminate\Support\Str::uuid()) // Generiši UUID
                                    ->hidden(),
                                Section::make('Pitanje')->schema([

                                    Grid::make(3)->schema([
                                        TextInput::make('question.text')->label('Question Text'),
                                        FileUpload::make('question.image')->label('Question Image'),
                                        FileUpload::make('question.sound')->label('Question Sound'),
                                        TextInput::make('question.id')
                                            ->label('ID')
                                            ->default(fn() => (string) \Illuminate\Support\Str::uuid()) // Generiši UUID
                                            ->hidden(),
                                    ]),
                                ]),

                                // Sekcija za odgovore (Answers)
                                Section::make('Answers')->schema([
                                    Grid::make(3)->schema([
                                        TextInput::make('answer.text')->label('Answer Text'),
                                        FileUpload::make('answer.image')->label('Answer Image'),
                                        FileUpload::make('answer.sound')->label('Answer Sound'),
                                        TextInput::make('answer.id')
                                            ->label('ID')
                                            ->default(fn() => (string) \Illuminate\Support\Str::uuid()) // Generiši UUID
                                            ->hidden(),
                                    ]),
                                ]),
                            ])

                            ->minItems(2)
                            ->maxItems(4)
                            ->columns(2)
                            ->required(),
                    ]),


                //Nema id u prvoj iteraciji - popravi

                Section::make(__('POVEZIVANJE'))->columns(1)
                    ->columnSpan(2)->visible(fn($get) => $get('type') === 'connect_lines')->schema([

                        Repeater::make('answers')
                            ->label('Pitanja i odgovori koji su povezani linijama')
                            ->schema([
                                TextInput::make('id')
                                    ->label('ID')
                                    ->default(fn() => (string) \Illuminate\Support\Str::uuid())->hidden(),


                                Section::make('Pitanje (Bice prikazano sa leve strane)')->schema([

                                    Grid::make(3)->schema([
                                        TextInput::make('question.text')->label('Question Text'),
                                        FileUpload::make('question.image')->label('Question Image'),
                                        FileUpload::make('question.sound')->label('Question Sound'),
                                        TextInput::make('question.id')
                                            ->label('ID')
                                            ->default(fn() => (string) \Illuminate\Support\Str::uuid())->hidden(),


                                    ]),
                                ]),
                                Section::make('Odgovor (Bice prikazan sa desne strane)')->schema([
                                    Grid::make(3)->schema([
                                        TextInput::make('answer.text')->label('Answer Text'),
                                        FileUpload::make('answer.image')->label('Answer Image'),
                                        FileUpload::make('answer.sound')->label('Answer Sound'),
                                        TextInput::make('answer.id')
                                            ->label('ID')
                                            ->default(fn() => (string) \Illuminate\Support\Str::uuid()) // Generiši UUID
                                            ->hidden(),
                                    ]),
                                ]),
                            ])->afterStateHydrated(function ($state) {
                                if (empty($state['answer']['id'])) {
                                    $state['answer']['id'] = (string) \Illuminate\Support\Str::uuid();
                                }
                            })
                            ->defaultItems(0)


                    ]),
                Section::make(__('CRTANJE SLOVA'))->columns(1)
                    ->columnSpan(2)->visible(fn($get) => $get('type') === 'drawing')->schema([
                        TextInput::make('helperText')
                            ->required()
                            ->label('SLOVO/REČ'),
                        Checkbox::make('showHelperText')
                            ->label('Prikaži reč na pozadini u aplikaciji?')
                            ->default(true),
                        FileUpload::make('sound')
                            ->label('Zvuk')
                            ->acceptedFileTypes(['audio/*'])
                            ->directory('sounds')
                            ->maxSize(10240),

                    ]),
                Section::make(__('SORTIRANJE'))->columns(1)
                    ->columnSpan(2)->visible(fn($get) => $get('type') === 'sorting')->schema([
                        FileUpload::make('sound')
                            ->label('Zvuk')
                            ->acceptedFileTypes(['audio/*'])
                            ->directory('sounds')
                            ->maxSize(10240),
                        FileUpload::make('image')->label('Slika (prikazuje se u naslovu)'),
                        Repeater::make('answers')
                            ->label('Dodaj reci ili slova za sortiranje')
                            ->schema([

                                Section::make('Reč (ili slovo)')->schema([

                                    Grid::make(3)->schema([
                                        TextInput::make('text')->label('Text'),
                                        // FileUpload::make('image')->label('Image'), NIJE POTREBNO OVDE
                                        // FileUpload::make('sound')->label('Sound'),
                                        TextInput::make('id')
                                            ->label('ID')
                                            ->default(fn() => (string) random_int(1, 10000))
                                            ->disabled()
                                            ->hidden(),
                                    ]),
                                ]),
                            ])
                            ->minItems(2)

                            ->columns(2)
                            ->required(),
                    ]),
                Section::make(__('SORTIRANJE U KOLONE'))->columns(1)
                    ->columnSpan(2)->visible(fn($get) => $get('type') === 'sorting_columns')->schema([
                        FileUpload::make('sound')
                            ->label('Zvuk')
                            ->acceptedFileTypes(['audio/*'])
                            ->directory('sounds')
                            ->maxSize(10240),
                        Repeater::make('answers')
                            ->label('Dodaj reci ili slova za sortiranje u kolone')
                            ->schema([

                                Section::make('Reč (ili slovo)')->schema([

                                    Grid::make(3)->schema([
                                        TextInput::make('text')->label('Text'),
                                        FileUpload::make('image')->label('Image'),
                                        // FileUpload::make('sound')->label('Sound'),
                                        TextInput::make('id')
                                            ->label('ID')
                                            ->default(fn() => (string) random_int(1, 10000))
                                            ->disabled()
                                            ->hidden(),
                                    ]),
                                ]),
                            ])
                            ->minItems(2)

                            ->columns(2)
                            ->required(),
                    ]),

            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('title')
            ->columns([
                TextColumn::make('title'),
                TextColumn::make('type')->label('Tip'),
                TextColumn::make('question')
                    ->label('Pitanje')


            ])
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])->reorderable('order');
    }
}
