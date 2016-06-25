/**
 * Functional stateless Component shown for the tutorial page.
 *
 * Created by kim on 2016-06-25.
 */

'use strict';

import React from 'react';
import Highlight from 'react-highlight'
let Tutorial = () => (
  <div className="tutorial-component left_align_text">
    <h3 className="bold center_text_2">Tutorial</h3>
    <p>
      A cache is a hardware or software component that stores data so future requests for that data can be served
      faster.
      A CPU cache is an example of an hardware cache that is used by the central processing unit (CPU) to reduce the
      cost to access data from the main memory.
      The idea behind it is that the cache-memory allows faster access than the regular main memory (RAM).
      Thus if the CPU can access the requested data from the cache instead of the main memory the access time will be
      reduced.
      Logically since the cache memory provides faster access than the main memory it is also more expensive and as a
      consequence you
      cannot buy cache memories of very large sizes for reasonable prices. So we can choose between a large but slow
      memory (main memory)
      and a small but fast memory (cache memory), which one to choose? The common solution that is not too expensive and
      still provides
      performance gains is to use both.
    </p>
    <img src="images/cache_arch.png" alt="Cache memory architecture" className="img-responsive center-image"/>
    <p>
      Now the tricky part with cache memories that requires sophisticated structures and algorithms is too decide how to
      keep
      the data in the cache consistent with the main memory and to decide where data should be stored in the cache
      memory as well
      as what to do when the cache is full?
    </p>
    <p>
      Cache memory varies in sizes, the bigger the more expensive.
      In the simulator you specify what cache size, block size, associativity and replacementalgorithm to use.
      Cache size is entered in bytes and specify the size of the whole cache memory.
      When designing the cache and your program you want the memory fetches as often as possible be a hit in the cache
      memory.
      We say that when the processor finds the address it's looking or in the cache we have a "cache hit", otherwise we
      have a "cache miss".
      In the context of caches you use the notion of "blocks", blocks have fixed size and everytime data is
      fetched from the main memory to the cache a whole block is fetched. Furher more when the addresses of the main
      memory is
      mapped to the cache memory there are different additional ways to structure the cache apart form just dividing it
      into blocks.
      The cache can be divided into sets, where each set contains a number of blocks. The number of sets is denoted with
      "associativity count".
    </p>
    <img src="images/form.png" alt="Form for cache information" className="img-responsive center-image"/>
    <p>
      So we know that the cache memory is smaller than the main memory... then how do we find the right location in the
      cache?
      surely we can't use the same addressing as for the main memory.
      The solution is that the main memory is divided into parts where one part decides the row in the cache (also
      called the index part),
      one part decides the byte inside the block (also called the block offset). For this cache simulator we assume main
      memory addresses of 32 bits.
      Lets say that the cache is of size 32 bytes with a block size of 8 bytes and a associativity count of 2.
      Then we need 1 bit to represent the index (two rows in each set) and 3 bits to represent the byte offset (8 bytes
      in each block).
    </p>
    <img src="images/address_layout.png" alt="Address Layout" className="img-responsive center-image"/>
    <p>
      So we can interpret the row and the byte from the address. But how do we know which set to look in?
      we don't, we need to check all sets to be sure. Okay so when there is a miss in the cache memory and
      we fetch a new memory block from the main memory we know by the address in which row it should be placed,
      but which set should it be placed in? If there is one or more empty rows among the sets it does'nt matter, we can
      choose any set.
      If there is'nt an empty row we should replace one row with the newly fetched block, which row to replace is
      decided by a replacement algorihm,
      the most common ones are LRU (Least Recently Used), FIFO (First In First Out), RANDOM.
    </p>
    <img src="images/replacement_algo.png" alt="Replacement Algorithm" className="img-responsive center-image"/>
    <p>
      So what is the optimal cache size, block size, associativity count and replacement algorithm?
      Well, the bigger cache size the better, but in real-world scenarios you don't have free hands when it comes to
      deciding the cache size,
      considering the cost. To optimize your cache memory in terms of block size, associaticity count and replacement
      algorithm is a interesting
      topic of it's own and it depends heavily on the type of program that the CPU is executing.
      Most programs, when inspected, shows locality. Locality (or locality of reference), means that some parts of
      program
      code and data is used alot and some parts are'nt used at all. If those parts that are executed alot gets placed in
      the
      cache memory the program execution will be faster. For example, consider a program with a loop:
    </p>
    <Highlight className='java'>
      {"int j; \n" +
      "for(int i = 0; i < 1000; i++){ \n" +
      "    j = i; \n" +
      "} \n" +
      "System.out.println(j);"}
    </Highlight>
    <p>
      If the memory addresses for the i and j variables are put in the cache after the first iteration of the loop,
      than we can reduce the number of fetches to main memory and ultimately increase the performance (reduce execution time).
      Usually you divide locality into two categories locality in time (temporal locality) and locality in the space (spatial locality).
      The code snippet above have high temporal locality (memory addresses newly accessed will soon be accessed again).
      Spatial locality means that when a certain memory address have been accessed, adresses close to it in memory will soon be accessed as well.
      Cache memories take advantage of both of these types of locality, temporal locality is utilized by placing instructions that just
      have been accessed in the cache memory, spatial locality is utilized by, when fetching from main memory, instead of just fetching
      the address in question, a whole block is fetched (the block contains nearby addresses). To measure the usefulness of the cache
      we measure the hit and miss rates. The higher hit rate and the lower miss rate, the better.
    </p>
    <img src="images/hit_miss_rate.png" alt="Hit and Miss rates" className="img-responsive center-image"/>
    <p>
      There are many different types of cache memories but the principal is universal.
      For simplicity in this simulator we simulate a d-cache for a uniprocessor system that uses a load-store architecture and a write-through policy.
      In systems with multiple processors it is common to have one cache memory for each processor,
      which also introduces the problem of cache coherence. In many computers a setup with two different cache memories for
      instructions and data-access is used, the reason for it is that a cache memory can only do one thing at a time
      thus if you use a single cache memory for data and for instructions you get a delay in that you cannot perform instructions
      when fetches from main main memory is being made. With separate instruction and data caches, all instructions goes through the
      instruction cache and other references, like LOAD and STORE instructions goes through the datacache (or d-cache).
    </p>
    <h4 className="bold center_text_2">Recap</h4>
    <p>
      The function of cache memories is to shorten the time to execute instructions by avoiding having to fetch from main memory.
      The cache memory is generally smaller than the main memory thus when we look for a certain memory address in the cache it can be either a hit or a miss
      Where to lookup memory addresses in the cache and how to update the cache memory is decided by the block count,
      associativity count, block size and replacement algorithm.
    </p>
  </div >
);

Tutorial.displayName = 'Tutorial';
export default Tutorial;
