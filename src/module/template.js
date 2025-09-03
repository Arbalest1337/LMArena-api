export const chatTemplate = ({ prompt }) => {
  const modelId = '2f5253e4-75be-473c-bcfc-baeb3df0f8ad'
  const evaluationSessionId = crypto.randomUUID()
  const userMessageId = crypto.randomUUID()
  const modelAMessageId = crypto.randomUUID()

  const messages = [
    {
      id: userMessageId,
      role: 'user',
      content: prompt,
      experimental_attachments: [],
      parentMessageIds: [],
      participantPosition: 'a',
      modelId: null,
      evaluationSessionId,
      status: 'pending',
      failureReason: null
    },
    {
      id: modelAMessageId,
      role: 'assistant',
      content: '',
      experimental_attachments: [],
      parentMessageIds: [userMessageId],
      participantPosition: 'a',
      modelId,
      evaluationSessionId,
      status: 'pending',
      failureReason: null
    }
  ]

  return {
    id: evaluationSessionId,
    messages,
    modality: 'chat',
    modelAId: modelId,
    userMessageId,
    modelAMessageId,
    mode: 'direct'
  }
}

export const imageTemplate = ({ prompt, imageUrl }) => {
  const modelId = 'e884e85b-c998-44d8-b38d-db42a300a318'
  const evaluationSessionId = crypto.randomUUID()
  const userMessageId = crypto.randomUUID()
  const modelAMessageId = crypto.randomUUID()
  const messages = [
    {
      id: userMessageId,
      role: 'user',
      content: prompt,
      experimental_attachments: [],
      parentMessageIds: [],
      participantPosition: 'a',
      modelId: null,
      evaluationSessionId: 'eab4abc3-24ac-40b4-866f-d6f5c5fe8678',
      status: 'pending',
      failureReason: null
    },
    {
      id: modelAMessageId,
      role: 'assistant',
      content: '',
      experimental_attachments: [],
      parentMessageIds: [userMessageId],
      participantPosition: 'a',
      modelId,
      evaluationSessionId,
      status: 'pending',
      failureReason: null
    }
  ]

  if (imageUrl) {
    messages[0].experimental_attachments.push({
      name: 'db40f430-e840-4c8e-9de8-35f1e196b3bd/ff53db094a833309f160466c50902d56.png',
      contentType: 'image/png',
      url: imageUrl
    })
  }

  return {
    mode: 'direct',
    modality: 'image',
    id: evaluationSessionId,
    messages,
    modelAId: modelId,
    userMessageId,
    modelAMessageId
  }
}
