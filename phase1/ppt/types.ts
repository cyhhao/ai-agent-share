import React from 'react';

export enum SlideType {
  INTRO = 'INTRO',
  PHILOSOPHY = 'PHILOSOPHY',
  SELECTION_SCORE = 'SELECTION_SCORE',
  SELECTION_REVIEW = 'SELECTION_REVIEW',
  SELECTION_SOTA = 'SELECTION_SOTA',
  REFACTOR_ROLE = 'REFACTOR_ROLE',
  REFACTOR_HONEST = 'REFACTOR_HONEST',
  REFACTOR_PLAN = 'REFACTOR_PLAN',
  EMPOWERMENT_MCP = 'EMPOWERMENT_MCP',
  EMPOWERMENT_CHASM = 'EMPOWERMENT_CHASM',
  FEEDBACK_LOOP = 'FEEDBACK_LOOP',
  COMMUNICATION_TOOLS = 'COMMUNICATION_TOOLS',
  COMMUNICATION_PROMPT = 'COMMUNICATION_PROMPT',
  WHY_CODING = 'WHY_CODING',
  EVOLUTION = 'EVOLUTION',
}

export interface ModelData {
  category: string;
  model: string;
  icon: React.ReactNode;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: React.ReactNode;
  highlight?: boolean;
  thinking?: string; // For showing thinking process
  isError?: boolean;
}