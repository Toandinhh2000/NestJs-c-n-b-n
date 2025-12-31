@Post('login')
async login(
  @Body() body,
  @Res({ passthrough: true }) res: Response,
) {
  const { accessToken, refreshToken, user } = await this.auth.login(body.email, body.password);

  // 🍪 Gửi Refresh Token qua Cookie
  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: false, // ⚠️ bật true nếu HTTPS/production
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
  });

  return { accessToken, user };
}
