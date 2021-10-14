import { IsEmail, Length } from 'class-validator';

let __;

export class CreateEventDto {
  id?: number;
  @Length(5, 255, {
    message: 'El nombre deb tener más de 5 letras',
  })
  //@Length(10, 255, { message: 'El nombre deb tener más de 10 letras', groups: ['update'], })
  name: string;
  description: string;
  when: string;
  @IsEmail(
    {
      allow_ip_domain: true,
    },
    {
      message: 'El valor debe ser un correo válido',
    },
  )
  address: string;
}
