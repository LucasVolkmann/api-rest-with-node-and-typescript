import { ETableNames } from '../ETableNames';
import { Knex } from 'knex';



export const seed = async (knex: Knex) => {
  
  const TABLE = ETableNames.person;

  const [{ count }] = await knex(TABLE).count<[{ count: number }]>('* as count');

  if(count > 0) return;

  console.log(`# Populating table '${TABLE}'`);
  
  await knex(TABLE).insert(people);

};

const people = [
  {
    firstName: 'Valentina',
    lastName: 'Castro',
    email: 'valentina.castro1@terra.com',
    idCity: 2
  },
  {
    firstName: 'Ana',
    lastName: 'Carvalho',
    email: 'ana.carvalho2@proton.com',
    idCity: 4
  },
  {
    firstName: 'Lucas',
    lastName: 'Pereira',
    email: 'lucas.pereira3@proton.com',
    idCity: 6
  },
  {
    firstName: 'Giovanna',
    lastName: 'Lima',
    email: 'giovanna.lima4@yahoo.com',
    idCity: 8
  },
  {
    firstName: 'Mateus',
    lastName: 'Santos',
    email: 'mateus.santos5@yahoo.com',
    idCity: 10
  },
  {
    firstName: 'Laura',
    lastName: 'Silva',
    email: 'laura.silva6@terra.com',
    idCity: 12
  },
  {
    firstName: 'Gabriel',
    lastName: 'Lima',
    email: 'gabriel.lima7@icloud.com',
    idCity: 14
  },
  {
    firstName: 'Beatriz',
    lastName: 'Lima',
    email: 'beatriz.lima8@outlook.com',
    idCity: 16
  },
  {
    firstName: 'Pedro',
    lastName: 'Rodrigues',
    email: 'pedro.rodrigues9@proton.com',
    idCity: 18
  },
  {
    firstName: 'Sofia',
    lastName: 'Araujo',
    email: 'sofia.araujo10@yahoo.com',
    idCity: 20
  },
  {
    firstName: 'Beatriz',
    lastName: 'Gomes',
    email: 'beatriz.gomes11@hotmail.com',
    idCity: 22
  },
  {
    firstName: 'Julia',
    lastName: 'Nascimento',
    email: 'julia.nascimento12@proton.com',
    idCity: 24
  },
  {
    firstName: 'Rafael',
    lastName: 'Souza',
    email: 'rafael.souza13@terra.com',
    idCity: 26
  },
  {
    firstName: 'Valentina',
    lastName: 'Rodrigues',
    email: 'valentina.rodrigues14@outlook.com',
    idCity: 28
  },
  {
    firstName: 'Pedro',
    lastName: 'Gomes',
    email: 'pedro.gomes15@yahoo.com',
    idCity: 30
  },
  {
    firstName: 'Ana',
    lastName: 'Almeida',
    email: 'ana.almeida16@terra.com',
    idCity: 32
  },
  {
    firstName: 'Pedro',
    lastName: 'Cardoso',
    email: 'pedro.cardoso17@outlook.com',
    idCity: 34
  },
  {
    firstName: 'Lucas',
    lastName: 'Santos',
    email: 'lucas.santos18@terra.com',
    idCity: 36
  },
  {
    firstName: 'Maria',
    lastName: 'Silva',
    email: 'maria.silva19@hotmail.com',
    idCity: 38
  },
  {
    firstName: 'Thiago',
    lastName: 'Costa',
    email: 'thiago.costa20@hotmail.com',
    idCity: 40
  },
  {
    firstName: 'Maria',
    lastName: 'Rodrigues',
    email: 'maria.rodrigues21@hotmail.com',
    idCity: 42
  },
  {
    firstName: 'Rafael',
    lastName: 'Silva',
    email: 'rafael.silva22@icloud.com',
    idCity: 44
  },
  {
    firstName: 'Mateus',
    lastName: 'Martins',
    email: 'mateus.martins23@gmail.com',
    idCity: 46
  },
  {
    firstName: 'Lucas',
    lastName: 'Ferreira',
    email: 'lucas.ferreira24@terra.com',
    idCity: 48
  },
  {
    firstName: 'Ana',
    lastName: 'Santos',
    email: 'ana.santos25@outlook.com',
    idCity: 50
  },
  {
    firstName: 'Gabriel',
    lastName: 'Lima',
    email: 'gabriel.lima26@hotmail.com',
    idCity: 52
  },
  {
    firstName: 'Isabella',
    lastName: 'Almeida',
    email: 'isabella.almeida27@proton.com',
    idCity: 54
  },
  {
    firstName: 'Carlos',
    lastName: 'Araujo',
    email: 'carlos.araujo28@outlook.com',
    idCity: 56
  },
  {
    firstName: 'Laura',
    lastName: 'Costa',
    email: 'laura.costa29@gmail.com',
    idCity: 58
  },
  {
    firstName: 'Laura',
    lastName: 'Nascimento',
    email: 'laura.nascimento30@icloud.com',
    idCity: 60
  },
  {
    firstName: 'Julia',
    lastName: 'Martins',
    email: 'julia.martins31@outlook.com',
    idCity: 62
  },
  {
    firstName: 'Ana',
    lastName: 'Lima',
    email: 'ana.lima32@gmail.com',
    idCity: 64
  },
  {
    firstName: 'Giovanna',
    lastName: 'Cardoso',
    email: 'giovanna.cardoso33@gmail.com',
    idCity: 66
  },
  {
    firstName: 'Giovanna',
    lastName: 'Almeida',
    email: 'giovanna.almeida34@proton.com',
    idCity: 68
  },
  {
    firstName: 'Isabella',
    lastName: 'Santos',
    email: 'isabella.santos35@terra.com',
    idCity: 70
  },
  {
    firstName: 'Pedro',
    lastName: 'Costa',
    email: 'pedro.costa36@hotmail.com',
    idCity: 72
  },
  {
    firstName: 'Lucas',
    lastName: 'Souza',
    email: 'lucas.souza37@yahoo.com',
    idCity: 74
  },
  {
    firstName: 'Isabella',
    lastName: 'Almeida',
    email: 'isabella.almeida38@proton.com',
    idCity: 76
  },
  {
    firstName: 'Rafael',
    lastName: 'Oliveira',
    email: 'rafael.oliveira39@gmail.com',
    idCity: 78
  },
  {
    firstName: 'Mateus',
    lastName: 'Carvalho',
    email: 'mateus.carvalho40@outlook.com',
    idCity: 80
  },
  {
    firstName: 'Giovanna',
    lastName: 'Lima',
    email: 'giovanna.lima41@gmail.com',
    idCity: 82
  },
  {
    firstName: 'Lucas',
    lastName: 'Oliveira',
    email: 'lucas.oliveira42@hotmail.com',
    idCity: 84
  },
  {
    firstName: 'Sofia',
    lastName: 'Carvalho',
    email: 'sofia.carvalho43@terra.com',
    idCity: 86
  },
  {
    firstName: 'Lucas',
    lastName: 'Santos',
    email: 'lucas.santos44@outlook.com',
    idCity: 88
  },
  {
    firstName: 'Isabella',
    lastName: 'Cardoso',
    email: 'isabella.cardoso45@icloud.com',
    idCity: 90
  },
  {
    firstName: 'Lucas',
    lastName: 'Oliveira',
    email: 'lucas.oliveira46@gmail.com',
    idCity: 92
  },
  {
    firstName: 'Laura',
    lastName: 'Carvalho',
    email: 'laura.carvalho47@icloud.com',
    idCity: 94
  },
  {
    firstName: 'Gabriel',
    lastName: 'Araujo',
    email: 'gabriel.araujo48@icloud.com',
    idCity: 96
  },
  {
    firstName: 'Pedro',
    lastName: 'Costa',
    email: 'pedro.costa49@hotmail.com',
    idCity: 98
  },
  {
    firstName: 'Gabriel',
    lastName: 'Lima',
    email: 'gabriel.lima50@yahoo.com',
    idCity: 100
  },
  {
    firstName: 'Ana',
    lastName: 'Castro',
    email: 'ana.castro51@proton.com',
    idCity: 102
  },
  {
    firstName: 'Julia',
    lastName: 'Almeida',
    email: 'julia.almeida52@icloud.com',
    idCity: 104
  },
  {
    firstName: 'Ana',
    lastName: 'Costa',
    email: 'ana.costa53@outlook.com',
    idCity: 106
  },
  {
    firstName: 'Carlos',
    lastName: 'Souza',
    email: 'carlos.souza54@proton.com',
    idCity: 108
  },
  {
    firstName: 'Gabriel',
    lastName: 'Carvalho',
    email: 'gabriel.carvalho55@outlook.com',
    idCity: 110
  },
  {
    firstName: 'Lucas',
    lastName: 'Oliveira',
    email: 'lucas.oliveira56@terra.com',
    idCity: 112
  },
  {
    firstName: 'Rafael',
    lastName: 'Souza',
    email: 'rafael.souza57@proton.com',
    idCity: 114
  },
  {
    firstName: 'Mateus',
    lastName: 'Almeida',
    email: 'mateus.almeida58@proton.com',
    idCity: 116
  },
  {
    firstName: 'Leonardo',
    lastName: 'Castro',
    email: 'leonardo.castro59@terra.com',
    idCity: 118
  },
  {
    firstName: 'Gabriel',
    lastName: 'Ferreira',
    email: 'gabriel.ferreira60@yahoo.com',
    idCity: 120
  },
  {
    firstName: 'Enzo',
    lastName: 'Pereira',
    email: 'enzo.pereira61@yahoo.com',
    idCity: 122
  },
  {
    firstName: 'Leonardo',
    lastName: 'Santos',
    email: 'leonardo.santos62@hotmail.com',
    idCity: 124
  },
  {
    firstName: 'Enzo',
    lastName: 'Martins',
    email: 'enzo.martins63@icloud.com',
    idCity: 126
  },
  {
    firstName: 'Carlos',
    lastName: 'Souza',
    email: 'carlos.souza64@yahoo.com',
    idCity: 128
  },
  {
    firstName: 'Enzo',
    lastName: 'Ferreira',
    email: 'enzo.ferreira65@terra.com',
    idCity: 130
  },
  {
    firstName: 'Mateus',
    lastName: 'Castro',
    email: 'mateus.castro66@gmail.com',
    idCity: 132
  },
  {
    firstName: 'Rafael',
    lastName: 'Almeida',
    email: 'rafael.almeida67@terra.com',
    idCity: 134
  },
  {
    firstName: 'Carlos',
    lastName: 'Martins',
    email: 'carlos.martins68@icloud.com',
    idCity: 136
  },
  {
    firstName: 'Maria',
    lastName: 'Martins',
    email: 'maria.martins69@outlook.com',
    idCity: 138
  },
  {
    firstName: 'Giovanna',
    lastName: 'Rocha',
    email: 'giovanna.rocha70@icloud.com',
    idCity: 140
  },
  {
    firstName: 'Thiago',
    lastName: 'Pereira',
    email: 'thiago.pereira71@outlook.com',
    idCity: 142
  },
  {
    firstName: 'Enzo',
    lastName: 'Rodrigues',
    email: 'enzo.rodrigues72@yahoo.com',
    idCity: 144
  },
  {
    firstName: 'Manuela',
    lastName: 'Souza',
    email: 'manuela.souza73@proton.com',
    idCity: 146
  },
  {
    firstName: 'Mateus',
    lastName: 'Carvalho',
    email: 'mateus.carvalho74@terra.com',
    idCity: 148
  },
  {
    firstName: 'Giovanna',
    lastName: 'Martins',
    email: 'giovanna.martins75@yahoo.com',
    idCity: 150
  },
  {
    firstName: 'Giovanna',
    lastName: 'Lima',
    email: 'giovanna.lima76@hotmail.com',
    idCity: 152
  },
  {
    firstName: 'Valentina',
    lastName: 'Pereira',
    email: 'valentina.pereira77@hotmail.com',
    idCity: 154
  },
  {
    firstName: 'Maria',
    lastName: 'Ferreira',
    email: 'maria.ferreira78@terra.com',
    idCity: 156
  },
  {
    firstName: 'Sofia',
    lastName: 'Silva',
    email: 'sofia.silva79@gmail.com',
    idCity: 158
  },
  {
    firstName: 'Leonardo',
    lastName: 'Pereira',
    email: 'leonardo.pereira80@yahoo.com',
    idCity: 160
  },
  {
    firstName: 'Laura',
    lastName: 'Cardoso',
    email: 'laura.cardoso81@yahoo.com',
    idCity: 162
  },
  {
    firstName: 'Thiago',
    lastName: 'Almeida',
    email: 'thiago.almeida82@hotmail.com',
    idCity: 164
  },
  {
    firstName: 'Isabella',
    lastName: 'Cardoso',
    email: 'isabella.cardoso83@icloud.com',
    idCity: 166
  },
  {
    firstName: 'Thiago',
    lastName: 'Castro',
    email: 'thiago.castro84@outlook.com',
    idCity: 168
  },
  {
    firstName: 'Lucas',
    lastName: 'Martins',
    email: 'lucas.martins85@hotmail.com',
    idCity: 170
  },
  {
    firstName: 'Leonardo',
    lastName: 'Nascimento',
    email: 'leonardo.nascimento86@icloud.com',
    idCity: 172
  },
  {
    firstName: 'Mateus',
    lastName: 'Santos',
    email: 'mateus.santos87@hotmail.com',
    idCity: 174
  },
  {
    firstName: 'Valentina',
    lastName: 'Lima',
    email: 'valentina.lima88@terra.com',
    idCity: 176
  },
  {
    firstName: 'Laura',
    lastName: 'Costa',
    email: 'laura.costa89@terra.com',
    idCity: 178
  },
  {
    firstName: 'Leonardo',
    lastName: 'Lima',
    email: 'leonardo.lima90@hotmail.com',
    idCity: 180
  },
  {
    firstName: 'Giovanna',
    lastName: 'Martins',
    email: 'giovanna.martins91@yahoo.com',
    idCity: 182
  },
  {
    firstName: 'Mateus',
    lastName: 'Pereira',
    email: 'mateus.pereira92@terra.com',
    idCity: 184
  },
  {
    firstName: 'Thiago',
    lastName: 'Martins',
    email: 'thiago.martins93@terra.com',
    idCity: 186
  },
  {
    firstName: 'Lucas',
    lastName: 'Silva',
    email: 'lucas.silva94@gmail.com',
    idCity: 188
  },
  {
    firstName: 'Lucas',
    lastName: 'Rodrigues',
    email: 'lucas.rodrigues95@terra.com',
    idCity: 190
  },
  {
    firstName: 'Sofia',
    lastName: 'Lima',
    email: 'sofia.lima96@terra.com',
    idCity: 192
  },
  {
    firstName: 'Maria',
    lastName: 'Araujo',
    email: 'maria.araujo97@hotmail.com',
    idCity: 194
  },
  {
    firstName: 'Carlos',
    lastName: 'Gomes',
    email: 'carlos.gomes98@yahoo.com',
    idCity: 196
  },
  {
    firstName: 'Sofia',
    lastName: 'Lima',
    email: 'sofia.lima99@terra.com',
    idCity: 198
  },
  {
    firstName: 'Leonardo',
    lastName: 'Cardoso',
    email: 'leonardo.cardoso100@terra.com',
    idCity: 200
  }
];
