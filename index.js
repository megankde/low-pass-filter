/*
 * Copyright (c) 2018-2019 Rafael da Silva Rocha.
 * Copyright (c) 2011 James Robert, http://jiaaro.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

/**
 * @fileoverview The low-pass-filter module.
 * @see https://github.com/rochars/low-pass-filter
 */

/** @module low-pass-filter */

/**
 * Low pass filter.
 * @param {!Array<number>|TypedArray} samples The samples.
 * @param {number} cutoff The cutoff frequency.
 * @param {number} sampleRate The sample rate.
 * @param {number} numChannels The number of channels.
 */
export function lowPassFilter(samples, cutoff, sampleRate, numChannels) {
    let rc = 1.0 / (cutoff * 2 * Math.PI);
    let dt = 1.0 / sampleRate;
    let alpha = dt / (rc + dt);
    let last_val = [];
    let offset;
    for (let i=0; i<numChannels; i++) {
        last_val[i] = samples[i];
    }
    for (let i=0; i<samples.length; i++) {
        for (let j=0; j< numChannels; j++) {
            offset = (i * numChannels) + j;
            last_val[j] =
                last_val[j] + (alpha * (samples[offset] - last_val[j]));
            samples[offset] = last_val[j];
        }
    }
}
