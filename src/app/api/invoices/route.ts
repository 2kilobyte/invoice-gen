// app/api/invoices/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        client: true,
        items: true,
        payments: true
      },
      orderBy: { date: 'desc' }
    })
    
    return NextResponse.json(invoices)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Generate invoice number
    const lastInvoice = await prisma.invoice.findFirst({
      orderBy: { createdAt: 'desc' }
    })
    const invoiceNumber = lastInvoice ? 
      `ECX-${parseInt(lastInvoice.invoiceNumber.split('-')[1]) + 1}` : 
      'ECX-792'
    
    const invoice = await prisma.invoice.create({
      data: {
        ...data,
        invoiceNumber,
        items: {
          create: data.items
        }
      },
      include: {
        client: true,
        items: true
      }
    })
    
    return NextResponse.json(invoice)
  } catch (error) {
    console.error('Error creating invoice:', error)
    return NextResponse.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    )
  }
}