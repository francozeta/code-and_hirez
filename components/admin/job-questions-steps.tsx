"use client"

import { useState } from "react"
import { Plus, Trash2, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import type { Question } from "@/types/db"

interface JobQuestionsStepProps {
  questions: Question[]
  onChange: (questions: Question[]) => void
}

export function JobQuestionsStep({ questions, onChange }: JobQuestionsStepProps) {
  const [localQuestions, setLocalQuestions] = useState<Question[]>(questions)

  const addQuestion = () => {
    if (localQuestions.length >= 5) {
      return
    }

    const newQuestion: Question = {
      id: crypto.randomUUID(),
      label: "",
      type: "short_text",
      required: true,
    }

    const updated = [...localQuestions, newQuestion]
    setLocalQuestions(updated)
    onChange(updated)
  }

  const removeQuestion = (id: string) => {
    const updated = localQuestions.filter((q) => q.id !== id)
    setLocalQuestions(updated)
    onChange(updated)
  }

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    const updated = localQuestions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    setLocalQuestions(updated)
    onChange(updated)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">Preguntas Personalizadas</CardTitle>
        <CardDescription>
          Agrega hasta 5 preguntas personalizadas para los candidatos ({localQuestions.length}/5)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {localQuestions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No hay preguntas agregadas</p>
            <p className="text-xs mt-1">Haz clic en "Agregar Pregunta" para comenzar</p>
          </div>
        ) : (
          <div className="space-y-4">
            {localQuestions.map((question, index) => (
              <Card key={question.id} className="border-2">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-2 cursor-move">
                      <GripVertical className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-semibold">Pregunta {index + 1}</Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuestion(question.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`question-label-${question.id}`} className="text-sm">
                          Pregunta
                        </Label>
                        <Input
                          id={`question-label-${question.id}`}
                          placeholder="ej: ¿Cuántos años de experiencia tienes con React?"
                          value={question.label}
                          onChange={(e) => updateQuestion(question.id, "label", e.target.value)}
                          required
                        />
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor={`question-type-${question.id}`} className="text-sm">
                            Tipo de Respuesta
                          </Label>
                          <Select
                            value={question.type}
                            onValueChange={(value) => updateQuestion(question.id, "type", value)}
                          >
                            <SelectTrigger id={`question-type-${question.id}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="short_text">Texto corto</SelectItem>
                              <SelectItem value="long_text">Texto largo</SelectItem>
                              <SelectItem value="yes_no">Sí/No</SelectItem>
                              <SelectItem value="number">Número</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`question-required-${question.id}`} className="text-sm">
                            Obligatoria
                          </Label>
                          <div className="flex items-center gap-2 h-10">
                            <Switch
                              id={`question-required-${question.id}`}
                              checked={question.required}
                              onCheckedChange={(checked) => updateQuestion(question.id, "required", checked)}
                            />
                            <span className="text-sm text-muted-foreground">{question.required ? "Sí" : "No"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Button
          type="button"
          variant="outline"
          onClick={addQuestion}
          disabled={localQuestions.length >= 5}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Agregar Pregunta {localQuestions.length > 0 && `(${5 - localQuestions.length} restantes)`}
        </Button>
      </CardContent>
    </Card>
  )
}
