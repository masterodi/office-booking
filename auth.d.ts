declare module '#auth-utils' {
  interface User {
    username: string
    role: 'NORMAL' | 'ADMIN'
  }
}

export { }
