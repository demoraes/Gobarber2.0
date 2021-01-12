import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../infra/typeorm/entities/Appointment';

/**
 *                          **Anotações Repositories**
 *  Repositories: Conexão entre a persistencia dos dados(banco de dados, localstorag e etc) e
 *  a nossa rota
 *
 *
 *  Obs: - Sempre que você precisar de alguma informação você ira se conectar com o repositorio
 *       - Possui a responsabilidade de criar, armazenar, ler, deletar e editar
 */
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    // se houver retorna findAppointment se não retorna null
    return findAppointment || null;
  }
}

export default AppointmentsRepository;
