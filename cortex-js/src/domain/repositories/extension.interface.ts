import { Extension } from '@/domain/abstracts/extension.abstract';
import { Repository } from './repository.interface';

export abstract class ExtensionRepository extends Repository<Extension> {}
