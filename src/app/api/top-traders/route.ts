import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { TopTrader } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// In-memory cache
let cachedTraders: TopTrader[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// GET - Fetch all traders
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const refresh = searchParams.get('refresh') === 'true';

    // Check cache first (unless refresh is requested)
    if (!refresh && cachedTraders && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
      console.log('[TopTraders API] Returning cached data');
      return NextResponse.json(cachedTraders);
    }

    console.log('[TopTraders API] Fetching from database');
    const { data, error } = await supabase
      .from('TopTraders')
      .select('*')
      .order('rank', { ascending: true });

    if (error) {
      console.error('[TopTraders API] Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Update cache
    cachedTraders = data || [];
    cacheTimestamp = Date.now();

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('[TopTraders API] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST - Create new trader
export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log('[TopTraders API] Creating trader:', body);

    const { data, error } = await supabase
      .from('TopTraders')
      .insert([body])
      .select();

    if (error) {
      console.error('[TopTraders API] Insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      console.error('[TopTraders API] No data returned after insert');
      return NextResponse.json({ error: 'Failed to create trader' }, { status: 500 });
    }

    console.log('[TopTraders API] Created successfully:', data[0]);

    // Clear cache
    cachedTraders = null;
    cacheTimestamp = null;

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('[TopTraders API] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// PUT - Update trader
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    console.log('[TopTraders API] Updating trader:', id, updateData);

    const { data, error } = await supabase
      .from('TopTraders')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) {
      console.error('[TopTraders API] Update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      console.error('[TopTraders API] No rows updated for id:', id);
      return NextResponse.json({ error: 'Trader not found' }, { status: 404 });
    }

    console.log('[TopTraders API] Updated successfully:', data[0]);

    // Clear cache
    cachedTraders = null;
    cacheTimestamp = null;

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('[TopTraders API] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete trader
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    console.log('[TopTraders API] Deleting trader with id:', id);

    const { data, error } = await supabase
      .from('TopTraders')
      .delete()
      .eq('id', parseInt(id))
      .select();

    if (error) {
      console.error('[TopTraders API] Delete error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      console.error('[TopTraders API] No rows deleted for id:', id);
      return NextResponse.json({ error: 'Trader not found' }, { status: 404 });
    }

    console.log('[TopTraders API] Deleted successfully:', data[0]);

    // Clear cache
    cachedTraders = null;
    cacheTimestamp = null;

    return NextResponse.json({ success: true, deleted: data[0] });
  } catch (error) {
    console.error('[TopTraders API] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
