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
                                'other_type1' => 'Other Type 1',
                                'other_type2' => 'Other Type 2',
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
                                    ]),
                                ]),

                                // Sekcija za odgovore (Answers)
                                Section::make('Answers')->schema([
                                    Grid::make(3)->schema([
                                        TextInput::make('answer.text')->label('Answer Text'),
                                        FileUpload::make('answer.image')->label('Answer Image'),
                                        FileUpload::make('answer.sound')->label('Answer Sound'),
                                    ]),
                                ]),
                            ])

                            ->minItems(2)
                            ->maxItems(4)
                            ->columns(2)
                            ->required(),
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
