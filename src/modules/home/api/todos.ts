import type { Todo, TodoItem } from '../types'

const API_URL = import.meta.env.VITE_APP_BASE_API

export async function fetchTodos(): Promise<TodoItem[]> {
	const res = await fetch(API_URL)
	const data = await res.json()
	return data
}

export async function createTodo(title: string): Promise<TodoItem> {
	const res = await fetch(API_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ title, completed: false })
	})
	const data = await res.json()
	return data
}

export async function updateTodo(todo: Todo): Promise<Todo> {
	await fetch(`${API_URL}/${todo.id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(todo)
	})
	return todo
}

export async function deleteTodo(id: number): Promise<void> {
	await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
}
