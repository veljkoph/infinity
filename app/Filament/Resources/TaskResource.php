<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TaskResource\Pages;
use App\Filament\Resources\TaskResource\RelationManagers;
use App\Models\Task;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TaskResource extends Resource
{
    protected static ?string $model = Task::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make(__('Osnovni podaci'))->columns(2)
                    ->columnSpan(2)->schema([
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
                        Repeater::make('answers')
                            ->label('Odgovori')
                            ->minItems(1)
                            ->maxItems(4)->cloneable()
                            ->schema([
                                TextInput::make('answer')
                                    ->required()
                                    ->label('Odgovor')
                                    ->placeholder('Unesite odgovor'),
                                FileUpload::make('image')->label('Slika')

                            ]),
                    ]),


                // Select::make('lesson_id')
                //     ->relationship('lesson', 'name')
                //     ->required()
                //     ->label('Lekcija'),

                // Textarea::make('question')
                //     ->required()
                //     ->label('Pitanje'),

                // FileUpload::make('sound')
                //     ->label('Zvuk'),

                // FileUpload::make('image')
                //     ->label('Slika'),


            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('type')->label('Tip'),
                TextColumn::make('title')->label('Naslov'),
                TextColumn::make('question')->label('Pitanje'),
                TextColumn::make('created_at')->dateTime(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTasks::route('/'),
            'create' => Pages\CreateTask::route('/create'),
            'edit' => Pages\EditTask::route('/{record}/edit'),
        ];
    }
}
