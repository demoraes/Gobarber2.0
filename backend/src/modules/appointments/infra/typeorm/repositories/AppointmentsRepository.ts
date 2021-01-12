import { EntityRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '../entities/Appointment';

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
class AppointmentsRepository
  extends Repository<Appointment>
  implements IAppointmentsRepository {
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    // se houver retorna findAppointment se não retorna null
    return findAppointment;
  }
}

export default AppointmentsRepository;
