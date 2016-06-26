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
      In the simulator you specify what cache size, block size, associativity and replacement algorithm to use.
      Cache size is entered in bytes and specify the size of the whole cache memory.
      You want to design the cache and the program to be ran such that the CPU can avoid accessing the main memory as
      far as possible, and be able to fetch from the cache memory instead.
      When the processor finds the address it's looking or in the cache we say that it is a <i>cache hit</i>, otherwise
      it's a <i>cache miss</i>.
    </p>
    <p>
      In the context of caches a notion of <i>blocks</i> is used, blocks have fixed size and every time data is
      fetched from the main memory to the cache a whole block is fetched (there is a purpose for this that we'll get to
      later).
      Additionally, there are more options for structuring the cache memory beyond specifying the block size.
      The cache can be divided into sets, where each set contains a number of blocks. The number of sets is labeled as
      "associativity count".
    </p>
    <img src="images/form.png" alt="Form for cache information" className="img-responsive center-image"/>
    <p>
      So we know that the cache memory is smaller than the main memory... then given a address for the main memory, how
      do we find the right location in the
      cache? surely we can't use the same addressing as for the main memory.
    </p>
    <p>
      This is handled in a neat way by translating the address for the main memory into a address in the cache memory.
      The main memory address is divided into parts, one parts decides the row in the cache (also called the index
      part),
      one part decides the byte inside the block (also called the block offset), and the third part specifies the
      address tag in the main memory.
      For this cache simulator we assume main memory addresses of 32 bits.
      Lets say that the cache is of size 32 bytes with a block size of 8 bytes and a associativity count of 2.
      Then we need 1 bit to represent the index (two rows in each set) and 3 bits to represent the byte offset (8 bytes
      in each block). And the remaining bits (32 - (1 +3)) represents the address tag in the main memory.
    </p>
    <img src="images/address_layout.png" alt="Address Layout" className="img-responsive center-image"/>
    <p>
      So we can interpret the row and the byte location in the cache from the main address. But how do we know which set
      to look in?
      With a associativity count > 1 we have mutiple blocks with the same index in the cache. This means that we need to
      go through all of the rows with the right index
      in order to be sure if there was a cache hit. So how about cache misses in a cache with associativity count > 1?
      When we fetch a memory block from the main memory we know by the address in which row of the cache it should be
      placed, but we dont know in which set.
      To handle this situation a <i>replacement algorithm</i> is used. Obviously if one or more blocks are empty we
      place the block in any one of the empty blocks,
      but if all blocks with the right index are full then we need to replace the contents of one block, which one to
      replace is decided by the replacement algorithm.
      The most common replacement algorithms are LRU (Least Recently Used), FIFO (First In First Out) and RANDOM.
    </p>
    <img src="images/replacement_algo.png" alt="Replacement Algorithm" className="img-responsive center-image"/>
    <p>
      So what is the optimal cache size, block size, associativity count and replacement algorithm?
      Well, the bigger cache size the better, but in real-world scenarios you don't have free hands when it comes to
      deciding the cache size,
      considering the cost. </p>
    <p>
      To optimize your cache memory in terms of block size, associativity count and replacement algorithm is an
      interesting
      topic of it's own and it depends heavily on the type of program that the CPU is executing.
      Most programs, when inspected, shows <i>locality</i>. Locality (or locality of reference), means that some parts
      of the
      program code and data is used a lot and some parts are'nt used at all. If those parts that are executed a lot gets
      placed in
      the cache memory then the program execution will be fast er. For example, consider a program with a loop:
    </p>
    <Highlight className='java'>
      {"int j; \n" +
      "for(int i = 0; i < 100; i++){ \n" +
      "    j = i; \n" +
      "} \n" +
      "System.out.println(j);"}
    </Highlight>
    <p>
      If the memory addresses for the i and j variables are put in the cache after the first iteration of the loop,
      then the number of fetches to main memory is greatly reduced and ultimately the program performance is increased.
      Usually you divide locality into two categories:
      <ul>
        <li>locality in time (temporal locality)</li>
        <li>locality in the space (spatial locality)</li>
      </ul>
      The code snippet above have high temporal locality (memory addresses newly accessed will soon be accessed again).
      Spatial locality means that when a certain memory address have been accessed, adresses close to it in memory will
      soon be accessed as well.
      Cache memories take advantage of both of these types of locality. Temporal locality is utilized by placing
      instructions that recently have been accessed in the cache memory. Spatial locality is utilized by, when fetching from main memory, instead
      of just fetching the address in question, a whole block is fetched (the block contains nearby addresses).
      To measure the usefulness of the cache we measure the hit and miss rates. The higher hit rate and the lower miss rate, the better.
      If a program consisted of the code-snippet above only, then we would expect a hit rate of ~99% and a miss rate of ~1%.
    </p>
    <img src="images/hit_miss_rate.png" alt="Hit and Miss rates" className="img-responsive center-image"/>
    <p>
      There are many different types of cache memories but the principle is universal.
      For simplicity in this simulator we simulate a d-cache for a uniprocessor system that uses a load-store
      architecture and a write-through policy.
    </p>
    <p>
      In systems with multiple processors it is common to have one cache memory for each processor,
      which also introduces the problem of cache coherence. Further more, in many computers a setup with two different cache memories
      for instructions and data-access is used, the reason for it is that a cache memory can only do one thing at a time
      thus if you use a single cache memory for both data and instructions you get a delay in that you cannot perform
      instructions when fetches from main main memory is being made. With separate instruction and data caches, all instructions goes
      through the instruction cache and other references, like LOAD and STORE instructions goes through the datacache (or d-cache).
      </p>
    <p>
      A load-store architecture
      means that the only instructions that interact with the memory is LOAD and STORE instructions. Write-through is a
      <i>policy</i> for STORE instructions. Simply put, it means that the main memory and the cache memory will always be coherent with each other,
      when a STORE-instruction is issued both main memory and cache memory is updated. An alternative policy is
      (write-back).
    </p>
    <p>
      Given that it is a d-cache you can simulate its behaviour by issuing LOAD/STORE - instructions. Either through a
      form or through a free-text area where you can enter a short program with multiple instructions.

      A instruction has the following form (the instructions mimic a kind of generic type of assembly):
    </p>
    <code>&lt;Operation&gt;&lt;space&gt;&lt;Register&gt;&lt;space&gt;&lt;Address&gt;</code> <br/>
    <p>
      Example:
    </p>
    <code>LOAD 1 0</code> <br/>
    <p>
      The instruction above will load the content of memory address 0x00 into register 1. Another example:
    </p>
    <code>
      STORE 1 4
    </code> <br/>
    <p>
      The instruction above will store the content of register 1 into memory address 0x00
    </p>
    <div className="alert alert-info">
      <strong>Note:</strong> For simplicity, all instructions in the simulator handles WORDS of data (4 bytes).
    </div>
    <div className="embed-responsive embed-responsive-16by9">
      <video controls className="embed-responsive-item">
        <source src="images/hit_miss.mp4" type="video/mp4"/>
      </video>
    </div>
    <h4 className="bold center_text_2">Recap</h4>
    <p>
      The function of cache memories is to shorten the time to execute instructions by avoiding having to fetch from
      main memory.
      The cache memory is generally smaller than the main memory thus when we look for a certain memory address in the
      cache it can be either a hit or a miss.
      Where to lookup memory addresses in the cache and how to update the cache memory is decided by the block count,
      associativity count, block size and replacement algorithm.
    </p>
  </div >
);

Tutorial.displayName = 'Tutorial';
export default Tutorial;
