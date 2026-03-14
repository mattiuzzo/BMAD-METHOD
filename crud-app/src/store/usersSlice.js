import { createSlice } from '@reduxjs/toolkit'
import { loadState } from '../utils/sessionStorage'

const mockUsers = [
  { id: 'u1', nome: 'Ana Silva', email: 'ana@email.com', role: 'admin' },
  { id: 'u2', nome: 'Bruno Costa', email: 'bruno@email.com', role: 'user' },
  { id: 'u3', nome: 'Carla Mendes', email: 'carla@email.com', role: 'user' },
  { id: 'u4', nome: 'Diego Rocha', email: 'diego@email.com', role: 'admin' }
]

const persistedUsers = loadState('users')

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: Array.isArray(persistedUsers) ? persistedUsers : mockUsers
  },
  reducers: {
    addUser(state, action) {
      state.list.push(action.payload)
    },
    updateUser(state, action) {
      const idx = state.list.findIndex(u => u.id === action.payload.id)
      if (idx !== -1) state.list[idx] = action.payload
    },
    deleteUser(state, action) {
      state.list = state.list.filter(u => u.id !== action.payload)
    }
  }
})

export const { addUser, updateUser, deleteUser } = usersSlice.actions
export default usersSlice.reducer
