<template>
  <div class="py-8 px-4 sm:px-6 lg:px-8">
    <!-- 余额和充值面板 -->
    <div class="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <!-- 余额显示 -->
        <div class="mb-6 md:mb-0">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Current Balance</h3>
          <div class="mt-2 flex items-baseline">
            <span class="text-4xl font-extrabold text-gray-900 dark:text-white">
              ${{ balance.toFixed(2) }}
            </span>
            <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">USD</span>
          </div>
        </div>

        <!-- 充值面板 -->
        <div class="flex-1 md:ml-8 max-w-2xl">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Add Credits</h3>
          
          <!-- 固定金额选项 -->
          <div class="grid grid-cols-3 gap-3 mb-4">
            <button v-for="amount in predefinedAmounts" 
                    :key="amount"
                    @click="selectedAmount = amount"
                    class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    :class="[
                      selectedAmount === amount 
                        ? 'bg-indigo-600 dark:bg-indigo-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                    ]">
              ${{ amount }}
            </button>
          </div>

          <!-- 自定义金额输入 -->
          <div class="flex space-x-4">
            <div class="flex-1">
              <div class="relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
                </div>
                <input type="number" 
                       v-model="customAmount"
                       min="1"
                       step="1"
                       class="block w-full pl-7 pr-12 py-2 rounded-md 
                              border border-gray-300 dark:border-gray-600
                              text-gray-900 dark:text-white
                              bg-white dark:bg-gray-700
                              focus:ring-indigo-500 dark:focus:ring-indigo-400
                              focus:border-indigo-500 dark:focus:border-indigo-400"
                       placeholder="Custom amount">
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 dark:text-gray-400 sm:text-sm">USD</span>
                </div>
              </div>
            </div>
            <button @click="handleRecharge"
                    :disabled="!isValidAmount"
                    class="px-6 py-2 rounded-md text-sm font-medium text-white
                           bg-indigo-600 dark:bg-indigo-500 
                           hover:bg-indigo-700 dark:hover:bg-indigo-600
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-colors">
              Add Credits
            </button>
          </div>

          <!-- 错误提示 -->
          <p v-if="error" class="mt-2 text-sm text-red-600 dark:text-red-400">
            {{ error }}
          </p>
        </div>
      </div>
    </div>

    <!-- 标题部分 -->
    <div class="text-center">
      <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
        Simple, transparent pricing
      </h2>
      <p class="mt-4 text-xl text-gray-600 dark:text-gray-400">
        Choose the plan that best fits your needs
      </p>
    </div>

    <!-- 价格卡片 -->
    <div class="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
      <!-- 免费版 -->
      <div class="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm divide-y divide-gray-200 dark:divide-gray-700">
        <div class="p-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white">Free</h3>
          <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">Perfect for getting started and exploring features.</p>
          <p class="mt-8">
            <span class="text-4xl font-extrabold text-gray-900 dark:text-white">$0</span>
            <span class="text-base font-medium text-gray-500 dark:text-gray-400">/month</span>
          </p>
          <button @click="selectPlan('free')"
            class="mt-8 w-full bg-indigo-600 dark:bg-indigo-500 text-white rounded-md py-2 px-4 hover:bg-indigo-700 dark:hover:bg-indigo-600">
            Get Started
          </button>
        </div>
        <div class="pt-6 pb-8 px-6">
          <h4 class="text-sm font-medium text-gray-900 dark:text-white tracking-wide uppercase">Features</h4>
          <ul class="mt-6 space-y-4">
            <li class="flex space-x-3">
              <font-awesome-icon icon="check" class="h-5 w-5 text-green-500" />
              <span class="text-sm text-gray-500 dark:text-gray-400">5,000 API calls/month</span>
            </li>
            <li class="flex space-x-3">
              <font-awesome-icon icon="check" class="h-5 w-5 text-green-500" />
              <span class="text-sm text-gray-500 dark:text-gray-400">Basic analytics</span>
            </li>
            <li class="flex space-x-3">
              <font-awesome-icon icon="check" class="h-5 w-5 text-green-500" />
              <span class="text-sm text-gray-500 dark:text-gray-400">Community support</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- 专业版 -->
      <div class="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 relative">
        <!-- 推荐标签 -->
        <div class="absolute -top-4 inset-x-0 flex justify-center">
          <span class="inline-flex rounded-full bg-indigo-100 dark:bg-indigo-900 px-4 py-1 text-sm font-semibold text-indigo-600 dark:text-indigo-300">
            Most Popular
          </span>
        </div>
        
        <div class="p-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white">Pro</h3>
          <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">For growing businesses needing more power.</p>
          <p class="mt-8">
            <span class="text-4xl font-extrabold text-gray-900 dark:text-white">$49</span>
            <span class="text-base font-medium text-gray-500 dark:text-gray-400">/month</span>
          </p>
          <button @click="selectPlan('pro')"
            class="mt-8 w-full bg-indigo-600 dark:bg-indigo-500 text-white rounded-md py-2 px-4 hover:bg-indigo-700 dark:hover:bg-indigo-600">
            Start free trial
          </button>
        </div>
        <div class="pt-6 pb-8 px-6">
          <h4 class="text-sm font-medium text-gray-900 dark:text-white tracking-wide uppercase">Features</h4>
          <ul class="mt-6 space-y-4">
            <li class="flex space-x-3">
              <font-awesome-icon icon="check" class="h-5 w-5 text-green-500" />
              <span class="text-sm text-gray-500 dark:text-gray-400">50,000 API calls/month</span>
            </li>
            <li class="flex space-x-3">
              <font-awesome-icon icon="check" class="h-5 w-5 text-green-500" />
              <span class="text-sm text-gray-500 dark:text-gray-400">Advanced analytics</span>
            </li>
            <li class="flex space-x-3">
              <font-awesome-icon icon="check" class="h-5 w-5 text-green-500" />
              <span class="text-sm text-gray-500 dark:text-gray-400">Priority support</span>
            </li>
            <li class="flex space-x-3">
              <font-awesome-icon icon="check" class="h-5 w-5 text-green-500" />
              <span class="text-sm text-gray-500 dark:text-gray-400">Custom integrations</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- 企业版 -->
      <div class="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm divide-y divide-gray-200 dark:divide-gray-700">
        <div class="p-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white">Enterprise</h3>
          <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">For large organizations with custom needs.</p>
          <p class="mt-8">
            <span class="text-4xl font-extrabold text-gray-900 dark:text-white">$199</span>
            <span class="text-base font-medium text-gray-500 dark:text-gray-400">/month</span>
          </p>
          <button @click="selectPlan('enterprise')"
            class="mt-8 w-full bg-indigo-600 dark:bg-indigo-500 text-white rounded-md py-2 px-4 hover:bg-indigo-700 dark:hover:bg-indigo-600">
            Contact sales
          </button>
        </div>
        <div class="pt-6 pb-8 px-6">
          <h4 class="text-sm font-medium text-gray-900 dark:text-white tracking-wide uppercase">Features</h4>
          <ul class="mt-6 space-y-4">
            <li class="flex space-x-3">
              <font-awesome-icon icon="check" class="h-5 w-5 text-green-500" />
              <span class="text-sm text-gray-500 dark:text-gray-400">Unlimited API calls</span>
            </li>
            <li class="flex space-x-3">
              <font-awesome-icon icon="check" class="h-5 w-5 text-green-500" />
              <span class="text-sm text-gray-500 dark:text-gray-400">Custom analytics</span>
            </li>
            <li class="flex space-x-3">
              <font-awesome-icon icon="check" class="h-5 w-5 text-green-500" />
              <span class="text-sm text-gray-500 dark:text-gray-400">24/7 phone support</span>
            </li>
            <li class="flex space-x-3">
              <font-awesome-icon icon="check" class="h-5 w-5 text-green-500" />
              <span class="text-sm text-gray-500 dark:text-gray-400">SLA agreement</span>
            </li>
            <li class="flex space-x-3">
              <font-awesome-icon icon="check" class="h-5 w-5 text-green-500" />
              <span class="text-sm text-gray-500 dark:text-gray-400">Dedicated account manager</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- FAQ部分 -->
    <div class="max-w-4xl mx-auto mt-16">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-8">Frequently asked questions</h3>
      <div class="space-y-4">
        <div v-for="(faq, index) in faqs" :key="index" class="border-b border-gray-200 dark:border-gray-700 pb-4">
          <button @click="faq.isOpen = !faq.isOpen"
            class="flex justify-between items-center w-full text-left">
            <span class="text-base font-medium text-gray-900 dark:text-white">{{ faq.question }}</span>
            <font-awesome-icon :icon="faq.isOpen ? 'chevron-up' : 'chevron-down'" 
              class="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
          <div v-show="faq.isOpen" class="mt-2">
            <p class="text-base text-gray-500 dark:text-gray-400">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faCheck, 
  faChevronUp, 
  faChevronDown 
} from '@fortawesome/free-solid-svg-icons'

library.add(faCheck, faChevronUp, faChevronDown)

const router = useRouter()

const faqs = ref([
  {
    question: 'How do I get started?',
    answer: 'Simply choose a plan that fits your needs and click the get started button. You can start with our free plan and upgrade anytime.',
    isOpen: false
  },
  {
    question: 'Can I change plans later?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
    isOpen: false
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and wire transfers for enterprise customers.',
    isOpen: false
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 30-day money-back guarantee for all paid plans.',
    isOpen: false
  }
])

const selectPlan = (plan: 'free' | 'pro' | 'enterprise') => {
  // 暂时只是显示提示信息
  if (plan === 'enterprise') {
    alert('Please contact our sales team at sales@example.com')
    return
  }
  
  alert(`You selected the ${plan} plan. Payment functionality coming soon!`)
}

// 余额相关
const balance = ref(0)
const predefinedAmounts = [10, 50, 100]
const selectedAmount = ref(50)
const customAmount = ref('')
const error = ref('')

// 验证金额是否有效
const isValidAmount = computed(() => {
  const amount = customAmount.value 
    ? Number(customAmount.value) 
    : selectedAmount.value
  return amount > 0
})

// 处理充值
const handleRecharge = async () => {
  try {
    error.value = ''
    const amount = customAmount.value 
      ? Number(customAmount.value) 
      : selectedAmount.value

    if (amount <= 0) {
      error.value = 'Please enter a valid amount'
      return
    }

    // TODO: 实现实际的充值逻辑
    alert(`Processing payment for $${amount}...`)
  } catch (e: any) {
    error.value = e.message
  }
}
</script> 