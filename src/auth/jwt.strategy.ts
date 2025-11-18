// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "gastondev",
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      username: payload.username,
      es_gerente: payload.es_gerente,
      ong_id: payload.ong_id,
      ong_nombre: payload.ong_nombre,
    };
  }
}
