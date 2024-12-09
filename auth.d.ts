declare module '#auth-utils' {
  interface User {
    id: string
    username: string
    role: 'NORMAL' | 'ADMIN'
  }
}

export { }
