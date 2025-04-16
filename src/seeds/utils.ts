export enum LogSeedLevel {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
  START = 'start'
}

export function log(name: string, entity?: string, level: LogSeedLevel = LogSeedLevel.INFO) {
  const timestamp = new Date().toISOString();
  
  let message = '';

  switch (level) {
    case LogSeedLevel.START:
      message = `🌱 Starting seed for ${entity}...`;
      break;
    case LogSeedLevel.SUCCESS:
      message = `✅ Successfully completed seeding for ${entity}.`;
      break;
    case LogSeedLevel.ERROR:
      message = `❌ Error during seeding for ${entity}.`;
      break;
    default:
      message = `${name}`;
      break;
  }

  console.log(`[${timestamp}] ${message}`);
}