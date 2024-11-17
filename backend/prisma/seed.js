import { PrismaClient } from "@prisma/client";
import { characters } from "../constants/characters";

const prisma = new PrismaClient();

const main = async () => {
    for (const character of characters) {
        await prisma.character.create({
            data: {
                name: character.name,
                positions: {
                    create: character.positions.map((position) => ({
                        top: position.top,
                        bottom: position.bottom,
                        left: position.left,
                        right: position.right,
                    }))        
                }
            }
        })
    }
}

main().catch(err => console.error(err)).finally(async () => await prisma.$disconnect())