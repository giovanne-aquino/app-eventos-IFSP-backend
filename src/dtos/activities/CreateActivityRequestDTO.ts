export class CreateActivityDto {
    name!: string;
    description!: string;
    format!: 'PRESENTIAL' | 'ONLINE' | 'HYBRID';
    location?: string;
    userDocument!: boolean;
    banner?: string;
    startDate!: Date;
}

// model Activity {
//     id                  Int       @id @default(autoincrement())
//     name                String 
//     description         String
//     format              Format
//     location            String?
//     userDocument        Boolean
//     banner              String?
//     startDate           DateTime
//     startTime           String
//     activityType        ActivityType
//     maxCapacity         Int
//     complementaryHours  Int
//     eventId             Int
  
//     // Relation with Event and reverse
//     event               Event    @relation(fields: [eventId], references: [id])
//     activityRegistrations ActivityRegistration[]
//     fields              ActivityField[]
  
    
//   }