#!/usr/bin/env node
'use strict';
/* Updates local checkout files only. Git push/deployment belongs to the guarded manual workflow. */
const fs=require('node:fs');
const {siteConfig}=require('./ai-tutor-beta-release.cjs');
const mode=process.argv[2];
if(!['public','rollback'].includes(mode)){console.error('Mode must be public or rollback');process.exit(1);}
const home=fs.readFileSync('index.html','utf8');
const site=fs.readFileSync('ai-tutor-config.js','utf8');
const marker=JSON.parse(fs.readFileSync('PUBLIC_AI_BETA_STATUS.json','utf8'));
if(mode==='public' && marker.state!=='private')throw Error('Public transition requires private website baseline');
if(!['private','public'].includes(marker.state))throw Error('Invalid beta state');
if(marker.shared_ai_requests_per_utc_day!==25 || marker.per_ip_requests_per_60_seconds!==5)throw Error('Release metadata altered');
const match=home.match(/ai-tutor-config\.js\?v=([a-zA-Z0-9_-]+)/g);
if(!match || match.length!==1)throw Error('Expected exactly one AI config cache key');
const next=home.replace(/ai-tutor-config\.js\?v=[a-zA-Z0-9_-]+/,
 'ai-tutor-config.js?v='+ (mode==='public'?'public-beta-1':'private-rollback-1'));
const newStatus={...marker,state:mode==='public'?'public':'private'};
fs.writeFileSync('ai-tutor-config.js',siteConfig(site,mode));
fs.writeFileSync('index.html',next);
fs.writeFileSync('PUBLIC_AI_BETA_STATUS.json',JSON.stringify(newStatus,null,2)+'\n');
console.log('Local site release prepared:',newStatus.state,'(no push performed by script)');
