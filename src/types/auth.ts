export interface LoginCommand {
  email: string
  senha: string
}

export interface RefreshTokenCommand {
  refreshToken: string
}

export interface TokenResponse {
  accessToken: string
  expiresAt: string
  refreshToken: string
  refreshTokenExpiresAt: string
}
