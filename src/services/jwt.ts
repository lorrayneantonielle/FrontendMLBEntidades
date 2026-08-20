export interface JwtPayload {
  sub: string
  email: string
  nomeCompleto: string
  role?: string | string[]
  exp: number
}

export function decodeJwt(token: string): JwtPayload {
  const payload = token.split('.')[1]
  if (!payload) {
    throw new Error('Token JWT inválido.')
  }
  const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
  return JSON.parse(json) as JwtPayload
}

export function isExpired(payload: JwtPayload): boolean {
  return payload.exp * 1000 <= Date.now()
}
