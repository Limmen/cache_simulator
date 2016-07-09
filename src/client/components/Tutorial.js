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
    <h3 className="bold center_text_2">Tutorial <small>A short primer on cache memories</small></h3>
    <p>
     <i> A cache is a hardware or software component that stores data so future requests for that data can be served
      quicker.</i>
      </p>
    <p>
      A CPU cache is an example of an hardware cache that is used by the central processing unit (CPU) to increase execution speed.
      Since CPU's generally are able to perform operations on given operands faster than the time it takes the CPU to fetch or store data from the main memory,
       the performance can be enhanced by reducing the time the CPU spends waiting for operands and other data to be fetched or stored.
      </p>
    <p>
      The idea behind it is to store some part of the main memory in duplicate.  A copy of the data is stored in a cache memory that allows faster access than the regular main memory (RAM).
      If the CPU can access the requested data from a copy in the cache memory instead of the main memory, the access time will be reduced.
      Logically since the cache memory provides more rapid access than the main memory it is also more expensive.
      To keep the price budget on a reasonable level we get to choose between a large but slow
      memory (main memory)
      and a fast but small memory (cache memory). The most common strategy that is not too costly and
      still provides performance gains is to use both.
    </p>
    <img src="images/cache_arch.png" alt="Cache memory architecture" className="img-responsive center-image"/>
    <h4 className="bold center_text_2">Tasks of a Cache Memory</h4>
    <p>
      Now the tricky part is too decide how to keep the data in the cache consistent with the main memory and to decide
      where data should be stored in the cache memory as well as what to do when the cache is full.
      This is a complication that require that caches use sophisticated structures and algorithms.
    </p>
    <p>
      Cache memories vary in size, the bigger the more pricey.
      When using the simulator you initiate by specifying cache size, block size, associativity count and replacement algorithm.
      Cache size is entered in bytes and determines the size of the whole cache memory.
      As far as possible you want to design the cache and the program to be ran such that the CPU can avoid having to access
      the main memory and
      fetch form the cache memory instead.
      When the processor finds the address it's looking for in the cache we say that it is a <i>cache hit</i>, otherwise
      it's a <i>cache miss</i>.
    </p>
    <h4 className="bold center_text_2">Cache Memory Structure</h4>
    <p>
      In the context of caches, a notion of <i>blocks</i> is used. Blocks have fixed size and every time the cache memory
      is updated after accessing the main memory, instead of just updating the cache memory with only the referenced main memory address,
      the cache is updated with a <i>block</i> of memory addresses.
      There is a purpose for this that we'll get to later. In the simulator, block size is just as cache size, entered in bytes.
    </p>
    <p>
      Additionally, there are more options for structuring the cache memory beyond specifying the cache and block size.
      The cache can be divided into sets, where each set contains a number of blocks. The number of sets is labeled as
      "associativity count".
    </p>
    <img src="images/form.png" alt="Form for cache information" className="img-responsive center-image"/>
    <h4 className="bold center_text_2">Address Translation</h4>
    <p>
      Considering that the cache memory is smaller than the main memory, there need to be some kind of address translation
      when the CPU reads a main memory address from the program in order to know where in the cache memory to look.
    </p>
    <p>
      This is handled in a neat way by translating the main memory address into a cache memory address.
      The main memory address is divided into parts, one parts decides the row in the cache (also called the index
      part),
      one part decides the byte inside the block (also called the byte offset), and the remaininig part represents the
      address tag in the main memory.
      For this cache simulator we assume that main memory addresses are of size 32 bits.
      </p>
    <p>
      <strong>An example:</strong> <br/> Lets say that the cache is of size 32 bytes with a block size of 8 bytes and an associativity count of 2.
      Then we need 1 bit to represent the index (two rows in each set) and 3 bits to represent the byte offset (8 bytes
      in each block). And the remaining bits (32 - (1 +3)) represents the address tag in the main memory.
    </p>
    <img src="images/address_layout.png" alt="Address Layout" className="img-responsive center-image"/>
    <p>
      The address translation just described gives information about row number and byte number in the cache but it does'nt say anything about which set.
      With an associativity count > 1 we have multiple blocks on the same row (same index) in the cache. This means that a main memory address can match more than
      one block in the cache memory. In order to know if a main memory address generates a cache hit or miss we need to go through all of the matching blocks.
      </p>
    <p>
      A similar dilemma happens when there is a cache miss in a cache with associativity count > 1.
      We know by the address in which row of the cache the new block should be placed, but we don't know in which set.
      To handle this situation a <i>replacement algorithm</i> is used. Obviously if one or more block positions in the matching cache row are empty we
      place the fetched block in any one of the empty block positions,
      but if all block positions in the row with the right index are occupied we need to replace the contents of one block position. Which one to
      replace is decided by the replacement algorithm.
      The most common replacement algorithms are LRU (Least Recently Used), FIFO (First In First Out) and RANDOM.
      Each block in the cache contains one bit called the <i>valid bit</i> that tells if the block is valid or not. The valid bit will be looked at by the replacement algorithms.
    </p>
    <img src="images/replacement_algo.png" alt="Replacement Algorithm" className="img-responsive center-image"/>
    <h4 className="bold center_text_2">When to fetch from main memory to the cache</h4>
    <p>There are two established options for when to fetch from main memory to the cache, pre-fetch or on-demand.</p>
    <p>By using a hardware component that eavesdrops on the execution and memory accesses of the processor, it is possible to predict
    what memory addresses will be required before they're needed, giving the possibility to fetch those memory addresses in advance.
     When done successfully, this technique can boost the execution speed but it is also rather complex, it is not always possible to make correct predictions.</p>
    <p>The simulator fetches from main memory on-demand, which means that data is not fetched from main memory to the cache memory until it is needed by the CPU.</p>
    <h4 className="bold center_text_2">Cache Memory Performance and Utility</h4>
    <p>
      So what is the optimal cache size, block size, associativity count and replacement algorithm?
      Well, the bigger cache size the better, but in real-world scenarios you don't have free hands when it comes to
      deciding the cache size, considering the cost. </p>
    <p>
      To optimize your cache memory in terms of block size, associativity count and replacement algorithm is an
      interesting topic of it's own and it depends heavily on the type of program that the CPU is executing.
      Most programs, when inspected, shows <i>locality</i>. Locality (or locality of reference), means that some parts
      of the program code and data is used a lot and some parts are'nt used at all. If those parts that are executed a lot gets
      placed in the cache memory then the program execution will be faster. For example, consider a program with a loop:
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
      </p>
      <ul>
        <li>locality in time (temporal locality)</li>
        <li>locality in the space (spatial locality)</li>
      </ul>
    <p>
      The code snippet above have high temporal locality (memory addresses recently accessed will likely soon be accessed again).
      Spatial locality means that when a certain memory address have been accessed, addresses close to it in memory will
      likely soon be accessed as well.
      </p>
    <Highlight className='assembly'>
      {"LOAD 0 0 \n" +
      "LOAD 0 4 \n" +
      "LOAD 0 8 \n" +
      "LOAD 0 12"}
    </Highlight>
    <p>
      Cache memories take advantage of both of these types of locality. Temporal locality is utilized by placing
      instructions that recently have been accessed in the cache memory. Spatial locality is utilized by, when fetching
      from main memory, instead
      of just fetching the referenced address, a whole block is fetched (the block contains nearby addresses also).
      The assembly-like program above shows a high spatial locality. For example if we have a cache memory with a block size of 16 bytes;
       when the program above is ran, the first line will generate a cache miss by the CPU and a block of memory addresses 0-15 will be retrieved from the main memory to the cache memory.
      This means that the remaining operations in the program will be hits in the cache and don't require any further access to the main memory.
      </p>
    <p>
      To measure the usefulness of cache memories we measure hit and miss rates. The higher hit rate and the lower miss
      rate, the better.
      If a program consisted of the java code-snippet above only, then we would expect a hit rate of ~99% and a miss rate of
      ~1%. And likewise for the assembly code-snippet above and a block-size of 16bytes we would get a hit rate of ~75% and a miss rate of ~25%.
    </p>
    <img src="images/hit_miss_rate.png" alt="Hit and Miss rates" className="img-responsive center-image"/>
    <h4 className="bold center_text_2">Types of Cache Memories</h4>
    <p>
      There are many different types of cache memories but the principle is universal.
      For simplicity in this simulator we simulate a d-cache for a uniprocessor system that uses a load-store
      architecture and a write-through policy for STORE instructions.
    </p>
    <p>
      In systems with multiple processors it is common to have one cache memory for each processor,
      which also introduces the problem of cache coherence. However in this simulator we assume a uniprocessor system (only one processor).
      Further more, it is common to separate data and instruction caches into two  separate cache memories.
      The reason for it is that a cache memory can only do one thing at a time,
      thus if you use a single cache memory for both data and instructions you get a delay in that you cannot execute
      instructions when fetches from main main memory are being made. With separate instruction and data caches you can do certain operations in parallel.
      In computers with separate instruction and data caches, all instructions that don't need to access the memory goes through the instruction cache and
      all instructions that need to access the memory goes through the data cache. In this simulator we simulate a data-cache (d-cache).
    </p>
    <p>
      A load-store architecture means that the only instructions that interact with the memory are LOAD and STORE instructions.
      Write-through is a
      <i> policy </i> for STORE instructions. Simply put, it means that the main memory and the cache memory will always
      be consistent.
      When a STORE instruction is issued, both main memory and cache memory is updated. An alternative policy is
      write-back which can provide less latency than write-through but exposes certain risks when it comes to
      keeping the data in the cache consistent with the main memory.
    </p>
    <p>
      Given that this simulator mimic a d-cache you can simulate its behaviour by issuing LOAD/STORE instructions. Either through a
      form or through a free-text area where you can enter a short program with multiple instructions.

      A instruction has the following form (the instructions resemble a kind of generic type of assembly):
    </p>
    <code>&lt;Operation&gt;&lt;space&gt;&lt;Register&gt;&lt;space&gt;&lt;Address&gt;</code> <br/> <br/>
    <p>
      Example:
    </p>
    <code>LOAD 1 0</code> <br/> <br/>
    <p>
      The instruction above will load the content of memory address 0x0 into register 1. Another example:
    </p>
    <code>
      STORE 1 4
    </code> <br/> <br/>
    <p>
      The instruction above will store the content of register 1 into memory address 0x4.
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
      The function of cache memories is to shorten the time to execute instructions by avoiding having to access the
      main memory.
      The cache memory is generally smaller than the main memory, hence when we look for a certain memory address in the
      cache it can be either a hit or a miss.
      Where to lookup memory addresses in the cache and how to update the cache memory is decided by the block count,
      associativity count, block size and replacement algorithm.
      There are many different flavors of caches but in essence they do the same thing and have the same purpose.
    </p>
  </div >
);

Tutorial.displayName = 'Tutorial';
export default Tutorial;
