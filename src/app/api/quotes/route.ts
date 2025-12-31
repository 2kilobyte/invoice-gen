// app/api/quotes/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const quotes = await prisma.quote.findMany({
      include: {
        client: true,
        items: true
      },
      orderBy: { date: 'desc' }
    })
    
    return NextResponse.json(quotes)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch quotes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Generate quote number
    const lastQuote = await prisma.quote.findFirst({
      orderBy: { createdAt: 'desc' }
    })
    const nextNumber = lastQuote ? parseInt(lastQuote.quoteNumber) + 1 : 8499
    
    const quote = await prisma.quote.create({
      data: {
        ...data,
        quoteNumber: nextNumber.toString(),
        items: {
          create: data.items
        }
      },
      include: {
        client: true,
        items: true
      }
    })
    
    return NextResponse.json(quote)
  } catch (error) {
    console.error('Error creating quote:', error)
    return NextResponse.json(
      { error: 'Failed to create quote' },
      { status: 500 }
    )
  }
}