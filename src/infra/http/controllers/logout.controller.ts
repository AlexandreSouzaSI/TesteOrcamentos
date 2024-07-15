import { Controller, Post, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'

@Controller('auth')
export class AuthController {
  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    res.clearCookie('token')
    res.status(200).send({ message: 'Logout successful' })
  }
}
